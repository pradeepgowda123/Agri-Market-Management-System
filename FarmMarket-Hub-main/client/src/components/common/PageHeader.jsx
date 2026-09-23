const PageHeader = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
};

export default PageHeader;