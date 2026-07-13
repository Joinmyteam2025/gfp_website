import { useAction } from "convex/react";
import { CheckCircle2, Loader2, Tag, X } from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

interface PromoCodeInputProps {
  /** Called when a valid bypass code is applied (100% off) */
  onBypassApplied?: (code: string) => void;
  /** Called when any valid code is applied */
  onCodeValidated?: (code: string, discountPercent: number) => void;
  /** Compact mode for tight spaces */
  compact?: boolean;
  /** Custom class */
  className?: string;
}

export function PromoCodeInput({
  onBypassApplied,
  onCodeValidated,
  compact = false,
  className = "",
}: PromoCodeInputProps) {
  const validateCode = useAction(api.promoCodes.validatePromoCode);
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    label: string;
    discountPercent: number;
    isBypass: boolean;
  } | null>(null);
  const [expanded, setExpanded] = useState(false);

  async function handleApply() {
    if (!code.trim()) return;
    setChecking(true);
    setResult(null);
    try {
      const res = await validateCode({ code: code.trim() });
      setResult(res);
      if (res.valid) {
        onCodeValidated?.(code.trim(), res.discountPercent);
        if (res.isBypass) {
          onBypassApplied?.(code.trim());
        }
      }
    } catch {
      setResult({ valid: false, label: "Error validating code", discountPercent: 0, isBypass: false });
    } finally {
      setChecking(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  }

  // Already applied successfully
  if (result?.valid) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 ${className}`}>
        <CheckCircle2 className="size-4 text-green-500 shrink-0" />
        <span className="text-xs font-medium text-green-600">
          {result.discountPercent === 100 ? "100% OFF" : `${result.discountPercent}% OFF`} - {result.label}
        </span>
        <button
          onClick={() => { setResult(null); setCode(""); setExpanded(true); }}
          className="ml-auto p-0.5 hover:bg-green-500/10 rounded"
        >
          <X className="size-3 text-green-500/60" />
        </button>
      </div>
    );
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className={`flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#C5963A] transition-colors ${className}`}
      >
        <Tag className="size-3" />
        Have a promo code?
      </button>
    );
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setResult(null); }}
            onKeyDown={handleKeyDown}
            placeholder="Enter promo code"
            className={`w-full pl-9 pr-3 ${compact ? "h-9 text-xs" : "h-10 text-sm"} bg-background border border-border rounded-lg focus:border-[#C5963A]/50 focus:outline-none focus:ring-1 focus:ring-[#C5963A]/20 transition-all placeholder:text-muted-foreground/40`}
            autoFocus
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim() || checking}
          className={`${compact ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm"} bg-[#C5963A] hover:bg-[#9E7730] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0`}
        >
          {checking ? <Loader2 className="size-3.5 animate-spin" /> : "Apply"}
        </button>
        <button
          onClick={() => { setExpanded(false); setCode(""); setResult(null); }}
          className={`${compact ? "h-9 w-9" : "h-10 w-10"} flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors shrink-0`}
        >
          <X className="size-4" />
        </button>
      </div>
      {result && !result.valid && (
        <p className="text-xs text-red-500 pl-1">{result.label}</p>
      )}
    </div>
  );
}
