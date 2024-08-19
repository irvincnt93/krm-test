'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const StudentSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Field cannot be empty' })
    .email({ message: 'You must add a valid email' }),
  name: z
    .string()
    .min(1, { message: 'Field cannot be empty' })
    .max(50, {
      message: `You can add at most ${50} characters`,
    })
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
      'Name should contain only alphabets',
    ),
})

const StudentsSchema = z.object({
  students: z
    .array(StudentSchema)
    .min(1, {
      message: `You need to add at least ${1} student`,
    })
    .max(5, {
      message: `You can add at most ${5} students`,
    }),
})

export function SheldonAddForm() {
  const form = useForm<z.infer<typeof StudentsSchema>>({
    resolver: zodResolver(StudentsSchema),
    defaultValues: {
      students: [
        {
          name: '',
          email: '',
        },
      ],
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  // Create dynamic forms
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  })

  // Process your values here
  function onSubmit(values: z.infer<typeof StudentsSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {fields.map((_, index) => {
          return (
            <div key={index}>
              <div className="flex gap-x-3">
                <FormField
                  control={control}
                  key={index}
                  name={`students.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  key={index + 1}
                  name={`students.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )
        })}
        <Button
          disabled={fields.length >= 5}
          type="button"
          onClick={() => append({ email: '', name: '' })}
        >
          Append
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
