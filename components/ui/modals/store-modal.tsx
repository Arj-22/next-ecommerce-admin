"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../modal"
import * as z from "zod"; 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { Button } from "../button";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const formSchema = z.object({
        name: z.string().min(1),
    })
    
    
    
    const onSubmit = async(values:z.infer<typeof formSchema>) =>{
        console.log(values)
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            name: "",
        }
    })
    return(
        <Modal title="Create Store" description="Add a new Store to manage products and categories" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-commerce" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
    
}