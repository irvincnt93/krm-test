import { SheldonAddForm } from '@/components/Form/sheldonAddForm'
import { SheldonForm } from '@/components/Form/sheldonForm'

export default function Home() {
  return (
    <main className=" min-h-screen p-24">
      <div className="w-full max-w-5xl">
        <SheldonForm></SheldonForm>
        <SheldonAddForm></SheldonAddForm>
      </div>
    </main>
  )
}
