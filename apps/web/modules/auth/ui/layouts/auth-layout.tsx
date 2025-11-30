export const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen w-screen h-full flex justify-center items-center">
        {children}
    </div>
  )
}
