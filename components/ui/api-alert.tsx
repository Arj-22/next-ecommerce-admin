interface ApiAlertProps{
    title: string; 
    description: String; 
    varient: "public" | "admin";
}

const textMap: Record<ApiAlertProps["varient"], string> = {

    public: "Public",
    admin: "Admin"   
}

const varientMap: Record<ApiAlertProps["varient"], string> = {

    public: "Public",
    admin: "Admin"   
}

