"use client";

import { useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Radio,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Message sent successfully! ✅");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setResponseMessage("Error sending message. ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-8 py-16">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h1" color="blue-gray" className="mb-4">
          Contact Us
        </Typography>
        <Typography variant="lead" className="mx-auto w-full lg:w-5/12 !text-gray-500">
          Ready to get started? Feel free to reach out through the contact form,
          and let&apos;s embark on a journey of innovation and success.
        </Typography>
      </div>
      <Card shadow={true} className="container mx-auto border border-gray/50">
        <CardBody className="grid grid-cols-1 lg:grid-cols-7 md:gap-10">
          {/* Left Side - Contact Information */}
          <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-900">
            <Typography variant="h4" color="white" className="mb-2">
              Contact Information
            </Typography>
            <Typography variant="lead" className="mx-auto mb-8 text-base !text-gray-500">
              Fill up the form and our Team will get back to you within 24 hours.
            </Typography>
            <div className="flex gap-5">
              <PhoneIcon className="h-6 w-6 text-white" />
              <Typography variant="h6" color="white" className="mb-2">
                +91 9008587582
              </Typography>
            </div>
            <div className="flex my-2 gap-5">
              <EnvelopeIcon className="h-6 w-6 text-white" />
              <Typography variant="h6" color="white" className="mb-2">
                Personalmail.lucifer@gmail.com
              </Typography>
            </div>
            <div className="flex mb-10 gap-5">
              <TicketIcon className="h-6 w-6 text-white" />
              <Typography variant="h6" color="white" className="mb-2">
                Open Support Ticket
              </Typography>
            </div>
            <div className="flex items-center gap-5">
              <IconButton variant="text" color="white">
                <i className="fa-brands fa-facebook text-lg" />
              </IconButton>
              <IconButton variant="text" color="white">
                <i className="fa-brands fa-instagram text-lg" />
              </IconButton>
              <IconButton variant="text" color="white">
                <i className="fa-brands fa-github text-lg" />
              </IconButton>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-8 grid gap-4 lg:grid-cols-2">
                <Input
                  color="gray"
                  size="lg"
                  variant="static"
                  label="First Name"
                  name="firstName"
                  placeholder="eg. Lucas"
                  containerProps={{ className: "!min-w-full mb-3 md:mb-0" }}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  color="gray"
                  size="lg"
                  variant="static"
                  label="Last Name"
                  name="lastName"
                  placeholder="eg. Jones"
                  containerProps={{ className: "!min-w-full" }}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <Input
                color="gray"
                size="lg"
                variant="static"
                label="Email"
                name="email"
                placeholder="eg. lucas@mail.com"
                containerProps={{ className: "!min-w-full mb-8" }}
                value={formData.email}
                onChange={handleChange}
              />
              <Typography variant="lead" className="!text-blue-gray-500 text-sm mb-2">
                What are you interested on?
              </Typography>
              <div className="-ml-3 mb-14">
                <Radio color="gray" name="type" label="Design" defaultChecked />
                <Radio color="gray" name="type" label="Development" />
                <Radio color="gray" name="type" label="Support" />
                <Radio color="gray" name="type" label="Other" />
              </div>
              <Textarea
                color="gray"
                size="lg"
                variant="static"
                label="Your Message"
                name="message"
                containerProps={{ className: "!min-w-full mb-8" }}
                value={formData.message}
                onChange={handleChange}
              />
              <div className="w-full flex justify-end">
                <Button className="w-full md:w-fit" color="gray" size="md" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
              {responseMessage && (
                <Typography variant="lead" className="mt-4 text-center text-blue-gray-500">
                  {responseMessage}
                </Typography>
              )}
            </form>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default ContactForm;
