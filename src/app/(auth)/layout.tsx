interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return ( 
        <div className="bg-[url(https://images.unsplash.com/photo-1518185866548-1af773f45d23?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-top bg-cover h-full flex flex-col">
            <div className="z-[4] h-full w-full flex flex-col items-center justify-center">
                <div className="h-full w-full md:h-auto md:w-[420px]">
                    {children}
                </div>
            </div>
            <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,.4),rgba(0,0,0,.8))] z-[1]" />
        </div>
    )
}
 
export default AuthLayout;