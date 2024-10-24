"use client"

import * as React from "react";
import { cn } from "../lib/utils";
import axios from "axios";


interface TEMPFORMDATA {
    temperature: number | null,
    droneId: number,
    droneName: string,
    country: string,
}

export const Form = ({ setSuccess }: { setSuccess: Function }): JSX.Element => {

    const [tempFormData, setTempFormData] = React.useState<TEMPFORMDATA>({
        temperature: null,
        droneId: 65010673,
        droneName: "PACHARAPOL",
        country: "US",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempFormData({
            ...tempFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendTempFormData(tempFormData);
        console.log("Form submitted:", tempFormData);

    };

    async function sendTempFormData(data: TEMPFORMDATA) {
        try {
            const form_Data = {
                celsius: data.temperature,
                drone_id: data.droneId,
                drone_name: data.droneName,
                country: data.country,
            };
            const response = await axios.post(
                "http://localhost:8000/logs",
                form_Data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

    return (
        <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 mb-4 justify-center items-center">
                <LabelInputContainer>
                    <Label htmlFor="droneId">Drone ID</Label>
                    <Input
                        id="droneId"
                        name="droneId"
                        placeholder="Drone Id"
                        type="text"
                        value={tempFormData.droneId}
                        onChange={handleChange}
                        readOnly
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="droneName" >Drone Name</Label>
                    <Input
                        id="droneName"
                        name="droneName"
                        placeholder="Drone Name"
                        type="text"
                        value={tempFormData.droneName}
                        onChange={handleChange}
                        readOnly
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="temp" >Drone Temperature</Label>
                    <Input
                        id="temp"
                        name="temperature"
                        placeholder="Drone Temperature"
                        type="number"
                        value={tempFormData.temperature ?? ""}
                        onChange={handleChange}
                        min={0}
                        required
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="country" >Drone Country</Label>
                    <Input
                        id="country"
                        name="country"
                        placeholder="Drone Country"
                        type="text"
                        value={tempFormData.country}
                        onChange={handleChange}
                        readOnly
                    />
                </LabelInputContainer>
            </div>

            <button
                className="bg-gradient-to-br relative group/btn mt-8 from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Send &rarr;
                <BottomGradient />
            </button>
        </form>
    );
};

export const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    `flex h-10 w-full border-none bg-zinc-800 text-white rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
                    file:text-sm file:font-medium placeholder-text-neutral-600 
                    focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-600
                    disabled:cursor-not-allowed disabled:opacity-50
                    shadow-[0px_0px_1px_1px_var(--neutral-700)]`,
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

export const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
));