import { Suspense } from 'react'
import EditForm from './EditForm'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditForm />
    </Suspense>
  )
}
