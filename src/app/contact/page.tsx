import ContactForm from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Get In Touch</h1>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}