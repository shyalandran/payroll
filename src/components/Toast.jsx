import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, variant = "info", timeout = 3000) => {
      const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      const toast = { id, message, variant };
      setToasts((prev) => [toast, ...prev]);
      if (timeout > 0) {
        setTimeout(() => remove(id), timeout);
      }
      return id;
    },
    [remove]
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} onClose={remove} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function Toaster({ toasts, onClose }) {
  return (
    <div className="fixed top-6 right-6 bg-white z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`min-w-[240px] max-w-sm px-4 py-3 rounded-xl shadow-2xl border text-sm flex items-start gap-3 bg-white/95 backdrop-blur-md ring-1 ring-black/5 transition-all duration-300 ease-out animate-[slide-in_.3s_ease-out] ${
            t.variant === "success"
              ? "border-green-200 text-green-900"
              : t.variant === "error"
              ? "border-red-200 text-red-900"
              : t.variant === "warning"
              ? "border-yellow-200 text-yellow-900"
              : "border-indigo-200 text-indigo-900"
          }`}
          style={{
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          }}
        >
          <div className="mt-0.5">
            {t.variant === "success" && (
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
            )}
            {t.variant === "error" && (
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
            )}
            {t.variant === "warning" && (
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500" />
            )}
            {!["success", "error", "warning"].includes(t.variant) && (
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500" />
            )}
          </div>
          <span className="flex-1 leading-5">{t.message}</span>
          <button
            onClick={() => onClose(t.id)}
            className="text-xs opacity-60 hover:opacity-100 hover:scale-110 transition"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>
      ))}
      <style>{`@keyframes slide-in{from{opacity:0;transform:translateY(-6px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    </div>
  );
}
