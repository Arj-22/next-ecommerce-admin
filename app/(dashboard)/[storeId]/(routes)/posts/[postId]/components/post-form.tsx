"use client"

import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/ui/modals/alert-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category, Post } from "@prisma/client"
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod"; 

interface PostFormProps {
    initialData: Post | null; 
    name: string;
    postTitle: string;
    content: string;
}


const formSchema = z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
});
 
type PostFormValues = z.infer<typeof formSchema>; 


export const PostForm: React.FC<PostFormProps> = ({initialData}) => {
    
    const params = useParams();
    const router = useRouter(); 

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);  

    const title = initialData ? "Edit Post" : "Create Post"
    const description = initialData ? "Edit a Post" : " Add a new Post"
    const toastMessage = initialData ? "Post Updated" : "Post Created"
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<PostFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            title: "",
            content: "",
        }
    }); 

    const onSubmit = async (data: PostFormValues) =>{
        try{
            setLoading(true); 
            if(initialData){
                await axios.patch(`/api/${params.storeId}/posts/${params.postId}`, data);
            }else{
                await axios.post(`/api/${params.storeId}/posts`, data);
            }
            router.refresh(); 
            router.push(`/${params.storeId}/posts`)
            toast.success(toastMessage)
        }catch(error){
            toast.error("Something went wrong")   
        }finally{
            setLoading(false)
        }
    } 


    const onDelete = async () => {
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/posts/${params.postId}`)
            router.refresh();
            router.push(`/${params.storeId}/posts`)
            toast.success("Post deleted.")
        }catch(error){
            toast.error("Something went wrong")   
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
        <AlertModal isOpen={open} onClose={() =>setOpen(false)} onConfirm={onDelete} loading={loading}/>
        <div className="flex items-center justify-between"> 

            <Heading title={title} description={description}/>
            {initialData && (
            <Button disabled={loading} variant="destructive" size="sm" onClick={() =>setOpen(true)}>
                <Trash className="h-4 w-4"/>
            </Button>
            )}

        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <div className="grid grid-cols-3 gap-8">
                    <FormField control={form.control} name="name" render={({field}) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Post Name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }/>
                    <FormField control={form.control} name="title" render={({field}) =>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Post Title" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }/>
                    <FormField control={form.control} name="content" render={({field}) =>(
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Post Content" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }/>

                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    {action}
                </Button>
            </form>
        </Form>
        </>
    )
}