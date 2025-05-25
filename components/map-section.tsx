"use client"

export function MapSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nearest Medical Centers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find healthcare facilities near you with our interactive map. Locate hospitals, clinics, and emergency
            services in your area.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31120.17520040949!2d77.66335094856707!3d12.841861280090454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospitals%20in%20electronic%20city!5e0!3m2!1sen!2sin!4v1748133995337!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Nearest Medical Centers"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}
