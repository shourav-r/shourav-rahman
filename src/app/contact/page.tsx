import ContactForm from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
              Get In Touch
            </h1>
            <div className="bg-card p-6 sm:p-8 rounded-xl shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}