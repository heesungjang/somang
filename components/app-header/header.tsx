const AppHeader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between min-h-14 px-4 border-b-2 border-b-zinc-200 dark:border-b-zinc-800">
      {children}
    </div>
  );
};

const AppHeaderLeft = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex items-center gap-2 h-full">{children}</div>;
};

const AppHeaderRight = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex items-center gap-2 h-full">{children}</div>;
};

AppHeader.Left = AppHeaderLeft;
AppHeader.Right = AppHeaderRight;
AppHeader.displayName = "AppHeader";

export { AppHeader };
