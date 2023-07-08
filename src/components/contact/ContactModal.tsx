import ContactForm from "./ContactForm";

type Props = {}

const ContactModal = (props: Props) => {
  return (
    <div>
      <input type="checkbox" id="contact_modal" className="modal-toggle" />
      <div className="modal">
        <div className="p-12 relative overflow-hidden shadow-2xl modal-box bg-gradient-to-tr from-black via-base-300 to-black rounded-none">
          <label htmlFor="contact_modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white w-fit mb-4 to-gray-400">Say hello!</h3>
          <ContactForm />
        </div>
        <label className="modal-backdrop" htmlFor="contact_modal"></label>
      </div>
    </div>
  )
}

export default ContactModal