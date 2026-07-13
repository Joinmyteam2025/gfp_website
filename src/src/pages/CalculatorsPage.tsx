import { useState, useMemo, useCallback } from "react";
import { ArrowRight, Calculator, RotateCcw, ChevronDown, AlertTriangle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

/* ─── Calculator definitions ─── */
interface CalcDef {
  id: string;
  name: string;
  icon: string;
  category: string;
  fields: FieldDef[];
  calculate: (v: Record<string, number>) => { label: string; value: string; highlight?: boolean }[];
}

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  prefix?: string;
  suffix?: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");

/** Insert commas into the integer part of a number string */
function addCommas(raw: string): string {
  const stripped = raw.replace(/,/g, "");
  if (stripped === "" || stripped === "-" || stripped === ".") return raw;
  if (!/^-?\d*\.?\d*$/.test(stripped)) return raw;
  const parts = stripped.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function formatDefault(val: number, hasSuffix: boolean): string {
  if (hasSuffix) return String(val); // % fields — no commas
  return addCommas(String(val));
}

const calculators: CalcDef[] = [
  {
    id: "savings",
    name: "Savings Calculator",
    icon: "💰",
    category: "Savings",
    fields: [
      { key: "initial", label: "Initial Deposit", prefix: "$", placeholder: "10,000", defaultValue: 10000 },
      { key: "monthly", label: "Monthly Contribution", prefix: "$", placeholder: "500", defaultValue: 500 },
      { key: "rate", label: "Annual Interest Rate", suffix: "%", placeholder: "5", defaultValue: 5, step: 0.1 },
      { key: "years", label: "Time Period (Years)", placeholder: "10", defaultValue: 10, min: 1, max: 50 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const fv = v.initial * Math.pow(1 + r, n) + v.monthly * ((Math.pow(1 + r, n) - 1) / r);
      const totalContrib = v.initial + v.monthly * n;
      const interest = fv - totalContrib;
      return [
        { label: "Future Value", value: `$${fmt(fv)}`, highlight: true },
        { label: "Total Contributions", value: `$${fmt(totalContrib)}` },
        { label: "Total Interest Earned", value: `$${fmt(interest)}` },
      ];
    },
  },
  {
    id: "compound",
    name: "Compound Interest",
    icon: "📈",
    category: "Investing",
    fields: [
      { key: "principal", label: "Principal Amount", prefix: "$", placeholder: "25,000", defaultValue: 25000 },
      { key: "rate", label: "Annual Interest Rate", suffix: "%", placeholder: "7", defaultValue: 7, step: 0.1 },
      { key: "compounds", label: "Compounds Per Year", placeholder: "12", defaultValue: 12 },
      { key: "years", label: "Time Period (Years)", placeholder: "20", defaultValue: 20, min: 1, max: 50 },
    ],
    calculate: (v) => {
      const amount = v.principal * Math.pow(1 + v.rate / 100 / v.compounds, v.compounds * v.years);
      const interest = amount - v.principal;
      return [
        { label: "Final Amount", value: `$${fmt(amount)}`, highlight: true },
        { label: "Total Interest", value: `$${fmt(interest)}` },
        { label: "Growth Multiple", value: `${(amount / v.principal).toFixed(2)}x` },
      ];
    },
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    icon: "🏖️",
    category: "Retirement",
    fields: [
      { key: "age", label: "Current Age", placeholder: "30", defaultValue: 30, min: 18, max: 80 },
      { key: "retireAge", label: "Retirement Age", placeholder: "65", defaultValue: 65, min: 30, max: 85 },
      { key: "savings", label: "Current Savings", prefix: "$", placeholder: "50,000", defaultValue: 50000 },
      { key: "monthly", label: "Monthly Contribution", prefix: "$", placeholder: "1,000", defaultValue: 1000 },
      { key: "rate", label: "Expected Return", suffix: "%", placeholder: "7", defaultValue: 7, step: 0.1 },
    ],
    calculate: (v) => {
      const years = v.retireAge - v.age;
      const r = v.rate / 100 / 12;
      const n = years * 12;
      const fv = v.savings * Math.pow(1 + r, n) + v.monthly * ((Math.pow(1 + r, n) - 1) / r);
      const totalContrib = v.savings + v.monthly * n;
      const monthlyRetirement = (fv * (v.rate / 100 / 12)) / (1 - Math.pow(1 + v.rate / 100 / 12, -30 * 12));
      return [
        { label: "Retirement Nest Egg", value: `$${fmt(fv)}`, highlight: true },
        { label: "Total Contributions", value: `$${fmt(totalContrib)}` },
        { label: "Est. Monthly Income (30yr)", value: `$${fmt(monthlyRetirement)}` },
      ];
    },
  },
  {
    id: "mortgage",
    name: "Mortgage Calculator",
    icon: "🏡",
    category: "Real Estate",
    fields: [
      { key: "price", label: "Home Price", prefix: "$", placeholder: "400,000", defaultValue: 400000 },
      { key: "down", label: "Down Payment", suffix: "%", placeholder: "20", defaultValue: 20, step: 1 },
      { key: "rate", label: "Interest Rate", suffix: "%", placeholder: "6.5", defaultValue: 6.5, step: 0.1 },
      { key: "term", label: "Loan Term (Years)", placeholder: "30", defaultValue: 30 },
    ],
    calculate: (v) => {
      const loan = v.price * (1 - v.down / 100);
      const r = v.rate / 100 / 12;
      const n = v.term * 12;
      const payment = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPaid = payment * n;
      const totalInterest = totalPaid - loan;
      return [
        { label: "Monthly Payment", value: `$${fmt(payment)}`, highlight: true },
        { label: "Loan Amount", value: `$${fmt(loan)}` },
        { label: "Total Interest", value: `$${fmt(totalInterest)}` },
        { label: "Total Cost", value: `$${fmt(totalPaid)}` },
      ];
    },
  },
  {
    id: "auto-loan",
    name: "Auto Loan Calculator",
    icon: "🚗",
    category: "Loans",
    fields: [
      { key: "price", label: "Vehicle Price", prefix: "$", placeholder: "35,000", defaultValue: 35000 },
      { key: "down", label: "Down Payment", prefix: "$", placeholder: "5,000", defaultValue: 5000 },
      { key: "rate", label: "Interest Rate", suffix: "%", placeholder: "5.9", defaultValue: 5.9, step: 0.1 },
      { key: "term", label: "Loan Term (Months)", placeholder: "60", defaultValue: 60 },
    ],
    calculate: (v) => {
      const loan = v.price - v.down;
      const r = v.rate / 100 / 12;
      const payment = loan * (r * Math.pow(1 + r, v.term)) / (Math.pow(1 + r, v.term) - 1);
      const totalPaid = payment * v.term;
      const totalInterest = totalPaid - loan;
      return [
        { label: "Monthly Payment", value: `$${fmt(payment)}`, highlight: true },
        { label: "Loan Amount", value: `$${fmt(loan)}` },
        { label: "Total Interest", value: `$${fmt(totalInterest)}` },
      ];
    },
  },
  {
    id: "ira",
    name: "IRA Calculator",
    icon: "📊",
    category: "Retirement",
    fields: [
      { key: "current", label: "Current IRA Balance", prefix: "$", placeholder: "10,000", defaultValue: 10000 },
      { key: "annual", label: "Annual Contribution", prefix: "$", placeholder: "6,500", defaultValue: 6500 },
      { key: "rate", label: "Expected Return", suffix: "%", placeholder: "7", defaultValue: 7, step: 0.1 },
      { key: "years", label: "Years Until Retirement", placeholder: "30", defaultValue: 30, min: 1, max: 50 },
    ],
    calculate: (v) => {
      const r = v.rate / 100;
      let balance = v.current;
      for (let i = 0; i < v.years; i++) {
        balance = (balance + v.annual) * (1 + r);
      }
      const totalContrib = v.current + v.annual * v.years;
      return [
        { label: "IRA Balance at Retirement", value: `$${fmt(balance)}`, highlight: true },
        { label: "Total Contributions", value: `$${fmt(totalContrib)}` },
        { label: "Total Growth", value: `$${fmt(balance - totalContrib)}` },
      ];
    },
  },
  {
    id: "income",
    name: "Income Calculator",
    icon: "💵",
    category: "Income",
    fields: [
      { key: "salary", label: "Annual Salary", prefix: "$", placeholder: "75,000", defaultValue: 75000 },
      { key: "federalRate", label: "Federal Tax Rate", suffix: "%", placeholder: "22", defaultValue: 22, step: 1 },
      { key: "stateRate", label: "State Tax Rate", suffix: "%", placeholder: "5", defaultValue: 5, step: 0.5 },
      { key: "deductions", label: "Monthly Deductions", prefix: "$", placeholder: "200", defaultValue: 200 },
    ],
    calculate: (v) => {
      const afterFed = v.salary * (1 - v.federalRate / 100);
      const afterState = afterFed * (1 - v.stateRate / 100);
      const annualDeductions = v.deductions * 12;
      const netAnnual = afterState - annualDeductions;
      return [
        { label: "Monthly Take-Home", value: `$${fmt(netAnnual / 12)}`, highlight: true },
        { label: "Annual Net Income", value: `$${fmt(netAnnual)}` },
        { label: "Effective Tax Rate", value: `${((1 - netAnnual / v.salary) * 100).toFixed(1)}%` },
      ];
    },
  },
  {
    id: "529",
    name: "529 Plan Calculator",
    icon: "🎓",
    category: "Education",
    fields: [
      { key: "childAge", label: "Child's Current Age", placeholder: "5", defaultValue: 5, min: 0, max: 17 },
      { key: "collegeAge", label: "College Start Age", placeholder: "18", defaultValue: 18, min: 16, max: 22 },
      { key: "initial", label: "Current 529 Balance", prefix: "$", placeholder: "5,000", defaultValue: 5000 },
      { key: "monthly", label: "Monthly Contribution", prefix: "$", placeholder: "300", defaultValue: 300 },
      { key: "rate", label: "Expected Return", suffix: "%", placeholder: "6", defaultValue: 6, step: 0.1 },
    ],
    calculate: (v) => {
      const years = v.collegeAge - v.childAge;
      const r = v.rate / 100 / 12;
      const n = years * 12;
      const fv = v.initial * Math.pow(1 + r, n) + v.monthly * ((Math.pow(1 + r, n) - 1) / r);
      const totalContrib = v.initial + v.monthly * n;
      return [
        { label: "529 Balance at College", value: `$${fmt(fv)}`, highlight: true },
        { label: "Total Contributions", value: `$${fmt(totalContrib)}` },
        { label: "Tax-Free Growth", value: `$${fmt(fv - totalContrib)}` },
      ];
    },
  },
  {
    id: "credit-card",
    name: "Credit Card Payoff",
    icon: "💳",
    category: "Debt",
    fields: [
      { key: "balance", label: "Current Balance", prefix: "$", placeholder: "5,000", defaultValue: 5000 },
      { key: "rate", label: "APR", suffix: "%", placeholder: "19.99", defaultValue: 19.99, step: 0.01 },
      { key: "payment", label: "Monthly Payment", prefix: "$", placeholder: "200", defaultValue: 200 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      if (v.payment <= v.balance * r) {
        return [{ label: "Result", value: "Payment too low to pay off debt", highlight: true }];
      }
      const months = -Math.log(1 - (v.balance * r) / v.payment) / Math.log(1 + r);
      const totalPaid = v.payment * months;
      const totalInterest = totalPaid - v.balance;
      return [
        { label: "Months to Pay Off", value: `${Math.ceil(months)} months`, highlight: true },
        { label: "Total Interest Paid", value: `$${fmt(totalInterest)}` },
        { label: "Total Amount Paid", value: `$${fmt(totalPaid)}` },
      ];
    },
  },
  {
    id: "home-afford",
    name: "Home Affordability",
    icon: "🏠",
    category: "Real Estate",
    fields: [
      { key: "income", label: "Annual Income", prefix: "$", placeholder: "100,000", defaultValue: 100000 },
      { key: "debts", label: "Monthly Debts", prefix: "$", placeholder: "500", defaultValue: 500 },
      { key: "down", label: "Down Payment", prefix: "$", placeholder: "50,000", defaultValue: 50000 },
      { key: "rate", label: "Interest Rate", suffix: "%", placeholder: "6.5", defaultValue: 6.5, step: 0.1 },
    ],
    calculate: (v) => {
      const monthlyIncome = v.income / 12;
      const maxPayment = monthlyIncome * 0.28;
      const maxWithDebt = monthlyIncome * 0.36 - v.debts;
      const payment = Math.min(maxPayment, maxWithDebt);
      const r = v.rate / 100 / 12;
      const n = 360;
      const loanAmount = payment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      const homePrice = loanAmount + v.down;
      return [
        { label: "Max Home Price", value: `$${fmtInt(homePrice)}`, highlight: true },
        { label: "Max Loan Amount", value: `$${fmtInt(loanAmount)}` },
        { label: "Est. Monthly Payment", value: `$${fmt(payment)}` },
      ];
    },
  },
  {
    id: "heloc",
    name: "HELOC Calculator",
    icon: "🏦",
    category: "Real Estate",
    fields: [
      { key: "homeValue", label: "Home Value", prefix: "$", placeholder: "500,000", defaultValue: 500000 },
      { key: "owed", label: "Amount Owed on Mortgage", prefix: "$", placeholder: "300,000", defaultValue: 300000 },
      { key: "ltvMax", label: "Max LTV", suffix: "%", placeholder: "85", defaultValue: 85, step: 1 },
      { key: "rate", label: "HELOC Interest Rate", suffix: "%", placeholder: "8.5", defaultValue: 8.5, step: 0.1 },
    ],
    calculate: (v) => {
      const maxBorrow = v.homeValue * (v.ltvMax / 100) - v.owed;
      const equity = v.homeValue - v.owed;
      const monthlyInterest = (maxBorrow > 0 ? maxBorrow : 0) * (v.rate / 100 / 12);
      return [
        { label: "Available HELOC Amount", value: `$${fmtInt(Math.max(0, maxBorrow))}`, highlight: true },
        { label: "Current Home Equity", value: `$${fmtInt(equity)}` },
        { label: "Interest-Only Payment", value: `$${fmt(monthlyInterest)}` },
      ];
    },
  },
  {
    id: "rent-vs-buy",
    name: "Rent vs. Buy",
    icon: "🔑",
    category: "Real Estate",
    fields: [
      { key: "rent", label: "Monthly Rent", prefix: "$", placeholder: "2,000", defaultValue: 2000 },
      { key: "homePrice", label: "Home Price", prefix: "$", placeholder: "400,000", defaultValue: 400000 },
      { key: "downPct", label: "Down Payment", suffix: "%", placeholder: "20", defaultValue: 20, step: 1 },
      { key: "rate", label: "Mortgage Rate", suffix: "%", placeholder: "6.5", defaultValue: 6.5, step: 0.1 },
      { key: "years", label: "Years to Compare", placeholder: "10", defaultValue: 10, min: 1, max: 30 },
    ],
    calculate: (v) => {
      const totalRent = v.rent * v.years * 12;
      const loan = v.homePrice * (1 - v.downPct / 100);
      const r = v.rate / 100 / 12;
      const n = 30 * 12;
      const payment = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalBuy = payment * v.years * 12 + v.homePrice * v.downPct / 100;
      const appreciation = v.homePrice * Math.pow(1.03, v.years);
      return [
        { label: "Total Rent Cost", value: `$${fmtInt(totalRent)}` },
        { label: "Total Buy Cost", value: `$${fmtInt(totalBuy)}` },
        { label: `Home Value (${v.years}yr)`, value: `$${fmtInt(appreciation)}`, highlight: true },
      ];
    },
  },
];

/* ─── Formatted Input Component ─── */
function FormattedInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: number;
  onChange: (val: number) => void;
}) {
  const hasSuffix = !!field.suffix;
  const [display, setDisplay] = useState(() => formatDefault(value, hasSuffix));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");
      // Allow empty, minus, or dot as intermediate typing states
      if (raw === "" || raw === "-" || raw === ".") {
        setDisplay(e.target.value);
        return;
      }
      // Only allow valid number characters
      if (!/^-?\d*\.?\d*$/.test(raw)) return;

      // For % and small-number fields, don't add commas
      if (hasSuffix) {
        setDisplay(raw);
      } else {
        setDisplay(addCommas(raw));
      }

      const num = parseFloat(raw);
      if (!isNaN(num)) onChange(num);
    },
    [hasSuffix, onChange],
  );

  // On blur, format cleanly
  const handleBlur = useCallback(() => {
    const raw = display.replace(/,/g, "");
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      if (hasSuffix) {
        setDisplay(String(num));
      } else {
        setDisplay(addCommas(String(num)));
      }
    } else {
      setDisplay(formatDefault(field.defaultValue, hasSuffix));
      onChange(field.defaultValue);
    }
  }, [display, hasSuffix, field.defaultValue, onChange]);

  // Sync with external resets
  const resetDisplay = useCallback(
    (newVal: number) => {
      setDisplay(formatDefault(newVal, hasSuffix));
    },
    [hasSuffix],
  );

  // Expose reset for parent
  (field as any)._resetDisplay = resetDisplay;

  return (
    <div>
      <label className="block text-xs font-medium text-white/50 mb-1.5">{field.label}</label>
      <div className="relative">
        {field.prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#C5963A]/50">
            {field.prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          className={`w-full bg-white/[0.04] border border-white/10 rounded-lg py-2.5 text-sm text-white placeholder-white/20 focus:border-[#C5963A]/40 focus:outline-none focus:ring-1 focus:ring-[#C5963A]/20 transition-colors ${
            field.prefix ? "pl-7 pr-3" : field.suffix ? "pl-3 pr-8" : "px-3"
          }`}
        />
        {field.suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#C5963A]/50">
            {field.suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Single Calculator Component ─── */
function CalculatorCard({ calc, isOpen, onToggle }: { calc: CalcDef; isOpen: boolean; onToggle: () => void }) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    calc.fields.forEach((f) => (defaults[f.key] = f.defaultValue));
    return defaults;
  });

  const [resetKey, setResetKey] = useState(0);

  const results = useMemo(() => calc.calculate(values), [values, calc]);

  const handleFieldChange = useCallback((key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    calc.fields.forEach((f) => (defaults[f.key] = f.defaultValue));
    setValues(defaults);
    setResetKey((k) => k + 1); // Force re-mount of inputs to reset display
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300">
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-3xl">{calc.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-serif font-bold text-white">{calc.name}</h3>
          <p className="text-xs text-white/30">{calc.category}</p>
        </div>
        <ChevronDown
          className={`size-5 text-white/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable body */}
      {isOpen && (
        <div className="px-6 pb-6 border-t border-white/5 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" key={resetKey}>
            {calc.fields.map((field) => (
              <FormattedInput
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={(val) => handleFieldChange(field.key, val)}
              />
            ))}
          </div>

          {/* Results */}
          <div className="bg-[#0B1D3A]/80 border border-[#C5963A]/10 rounded-xl p-5 mb-4">
            <div className="space-y-3">
              {results.map(({ label, value, highlight }) => (
                <div key={label} className={`flex items-center justify-between ${highlight ? "pb-3 border-b border-white/5" : ""}`}>
                  <span className={`text-sm ${highlight ? "text-white/70 font-medium" : "text-white/40"}`}>{label}</span>
                  <span className={`font-mono ${highlight ? "text-xl font-bold text-gold-gradient" : "text-sm text-white/60"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            <RotateCcw className="size-3" />
            Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Disclaimer Component ─── */
function CalculatorDisclaimer() {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="size-4 text-[#C5963A]/60 flex-shrink-0" />
          <h4 className="text-sm font-semibold text-white/60">Important Disclaimer</h4>
        </div>
        <div className="space-y-3 text-[11px] text-white/25 leading-relaxed">
          <p>
            The calculators provided on this platform are for educational and illustrative purposes only and should not be considered financial, investment, tax, or legal advice. All projections are hypothetical and based on user-provided inputs and assumed rates of return. Actual results will vary based on market conditions, individual circumstances, and other factors not reflected in these tools.
          </p>
          <p>
            Past performance is not indicative of future results. No guarantee or assurance is given that any projected outcomes will be achieved. Investing involves risk, including the possible loss of principal. You should consult with a qualified financial advisor, tax professional, or legal counsel before making any financial decisions.
          </p>
          <p>
            Garner Financial Partners does not guarantee the accuracy or completeness of the information provided by these calculators. By using these tools, you acknowledge that you understand the limitations of hypothetical projections and agree that Garner Financial Partners shall not be held liable for any financial decisions made based on calculator results.
          </p>
          <p>
            Garner Financial Partners does not provide securities or investment advisory services. Insurance products, where applicable, are offered through independently licensed insurance producers. Please check with your financial professional regarding your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export function CalculatorsPage() {
  const [openCalc, setOpenCalc] = useState<string>("savings");
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(calculators.map((c) => c.category)))];
  const filtered = filter === "All" ? calculators : calculators.filter((c) => c.category === filter);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C5963A]/[0.04] to-transparent rounded-full translate-y-1/4 -translate-x-1/4" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5963A]/10 border border-[#C5963A]/20 mb-6">
              <Calculator className="size-4 text-[#C5963A]" />
              <span className="text-xs font-medium text-[#C5963A]">Free Financial Tools</span>
            </div>
            <h1 className="fade-up fade-up-delay-1 text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Financial <span className="text-gold-gradient">Calculators</span>
            </h1>
            <p className="fade-up fade-up-delay-2 text-lg text-white/50 leading-relaxed">
              Plan your financial future with our suite of professional calculators. Interactive, instant results. No sign-up required.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-4 sticky top-20 z-30 bg-[#0A1628]/90 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  filter === cat
                    ? "bg-[#C5963A]/15 text-[#C5963A] border border-[#C5963A]/25"
                    : "text-white/40 hover:text-white/60 hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator List */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4">
            {filtered.map((calc) => (
              <ScrollReveal key={calc.id}>
                <CalculatorCard
                  calc={calc}
                  isOpen={openCalc === calc.id}
                  onToggle={() => setOpenCalc(openCalc === calc.id ? "" : calc.id)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Full legal disclaimer below calculators */}
          <CalculatorDisclaimer />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative bg-[#070F1D]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Want a <span className="text-gold-gradient">Personalized</span> Plan?
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed">
                Calculators give you a starting point. A blueprint call gives you a complete, customized strategy.
              </p>
              <button type="button"
                onClick={() => { (window as any).openVapiWidget?.(); }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5963A]/30 text-lg"
              >
                Speak to Us
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
