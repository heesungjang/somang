export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 w-svw">
      <div className="max-w-sm md:max-w-3xl items-center justify-center">
        {children}
      </div>
    </div>
  );
}
