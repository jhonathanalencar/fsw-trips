"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: string;
}

export default function TripSearch() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  function onSubmit(data: TripSearchForm) {
    router.push(
      `/trips/search?text=${data.text}&startDate=${data.startDate}&budget=${data.budget}`
    );
  }

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-no-repeat lg:py-28">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">
        Encontre sua próxima <span className="text-primary">Viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:mt-12 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg">
        <Input
          error={!!errors.text}
          errorMessage={errors.text?.message}
          placeholder="Onde você quer ir?"
          {...register("text", {
            required: { value: true, message: "Texto é obrigatório." },
          })}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data de Início"
                className="w-full"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                allowDecimals={false}
                onValueChange={(value) => field.onChange(value as string)}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="w-1/2 lg:h-fit"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
}
