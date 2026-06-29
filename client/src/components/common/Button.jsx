export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        bg-cyan-500
        hover:bg-cyan-600
        hover:scale-[1.02]
        active:scale-95
        text-white
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}