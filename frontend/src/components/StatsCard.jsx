function StatsCard({
  title,
  value,
  icon: Icon,
  color = "primary",
}) {
  const colorClasses = {
    primary: "from-primary-600/20 to-primary-700/10 border-primary-600/30",
    secondary: "from-secondary-600/20 to-secondary-700/10 border-secondary-600/30",
    cyan: "from-slate-600/20 to-slate-700/10 border-slate-600/30",
    emerald: "from-emerald-700/20 to-emerald-800/10 border-emerald-700/30",
  };

  const iconColorClasses = {
    primary: "text-primary-300",
    secondary: "text-secondary-300",
    cyan: "text-slate-300",
    emerald: "text-emerald-300",
  };

  return (
    <div className={`card-base bg-gradient-to-br ${colorClasses[color]} p-8 group hover-glow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide">
            {title}
          </p>

          <p className="text-white text-4xl font-bold mt-4 group-hover:scale-105 transition-transform duration-300">
            {value}
          </p>
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center ${iconColorClasses[color]} text-2xl`}>
            <Icon />
          </div>
        )}
      </div>

      <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
}

export default StatsCard;