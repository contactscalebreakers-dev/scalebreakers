import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GlitchTitle from "@/components/GlitchTitle";
import { Check, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Services3DModelling() {
  const [formData, setFormData] = useState({
    description: "",
    style: "",
    complexity: "",
    materials: "",
    timeline: "",
    budget: "",
    email: "",
    name: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendServiceEnquiryMutation = trpc.email.sendServiceEnquiry.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name || !formData.description || !formData.style || !formData.complexity || !formData.timeline || !formData.budget) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const detailsText = `
Project Description: ${formData.description}
Style: ${formData.style}
Complexity Level: ${formData.complexity}
Materials/Format: ${formData.materials}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
      `.trim();

      await sendServiceEnquiryMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: "",
        service: "3D Modelling",
        details: detailsText,
      });

      setSubmitted(true);
      setFormData({
        description: "",
        style: "",
        complexity: "",
        materials: "",
        timeline: "",
        budget: "",
        email: "",
        name: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: any) {
      setError(err?.message || "Failed to submit request. Please try again.");
      console.error("Failed to submit 3D modelling request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-5xl md:text-6xl font-black mb-6">3D Modelling Services</GlitchTitle>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
            Custom 3D models created from scratch for your creative projects. From character designs to product visualizations, we bring your ideas to life in 3D.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <GlitchTitle className="text-4xl font-black mb-12">What We Create</GlitchTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Character Design",
                desc: "Original character models for games, animation, and digital projects",
              },
              {
                title: "Product Visualization",
                desc: "Photorealistic product models for e-commerce and marketing",
              },
              {
                title: "Architectural Models",
                desc: "Detailed building and environment models for visualization",
              },
              {
                title: "Game Assets",
                desc: "Optimized 3D models ready for game engines (Unity, Unreal)",
              },
              {
                title: "Animation Models",
                desc: "Rigged and ready-to-animate character and object models",
              },
              {
                title: "Custom Creations",
                desc: "Any 3D model concept you can imagine, brought to life",
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-white border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-3 text-purple-900">{service.title}</h3>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <GlitchTitle className="text-4xl font-black mb-12">Our Process</GlitchTitle>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Concept", desc: "Discuss your vision and requirements" },
              { step: "2", title: "Design", desc: "Create initial concepts and mockups" },
              { step: "3", title: "Model", desc: "Build the detailed 3D model" },
              { step: "4", title: "Deliver", desc: "Final files in your preferred format" },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <GlitchTitle className="text-4xl font-black mb-8 text-center">Request Custom 3D Model</GlitchTitle>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border-2 border-green-600 rounded-lg text-green-800 font-bold">
              ✓ Request submitted! We'll be in touch soon.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-600 rounded-lg text-red-800 font-bold">
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border-2 border-gray-200">
            <div>
              <label className="block text-sm font-bold mb-2">Project Description *</label>
              <textarea 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what you want modeled..."
                rows={4}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Style *</label>
              <select 
                name="style" 
                value={formData.style}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              >
                <option value="">Select...</option>
                <option value="realistic">Photorealistic</option>
                <option value="stylized">Stylized/Cartoon</option>
                <option value="low-poly">Low Poly</option>
                <option value="technical">Technical/CAD</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Complexity Level *</label>
              <select 
                name="complexity" 
                value={formData.complexity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              >
                <option value="">Select...</option>
                <option value="simple">Simple (basic shapes)</option>
                <option value="moderate">Moderate (detailed)</option>
                <option value="complex">Complex (highly detailed)</option>
                <option value="very-complex">Very Complex (ultra-detailed)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Materials/Format</label>
              <input 
                type="text" 
                name="materials" 
                value={formData.materials}
                onChange={handleInputChange}
                placeholder="e.g., FBX, OBJ, Blender file, with textures"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Timeline *</label>
                <input 
                  type="text" 
                  name="timeline" 
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 weeks, ASAP"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Budget *</label>
                <input 
                  type="text" 
                  name="budget" 
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., $500-$1500"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Request 3D Model"}
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <GlitchTitle className="text-4xl font-black mb-12 text-center">Frequently Asked Questions</GlitchTitle>
          <div className="space-y-6">
            {[
              { q: "What software do you use?", a: "We use industry-standard tools like Blender, Maya, and 3DS Max to create high-quality 3D models." },
              { q: "Can you rig models for animation?", a: "Yes! We can create rigged models ready for animation in any game engine or animation software." },
              { q: "What file formats do you provide?", a: "We provide FBX, OBJ, BLEND, and other formats depending on your needs." },
              { q: "Do you include textures?", a: "Yes, all models come with high-quality textures and materials unless otherwise specified." },
              { q: "Can I use the models commercially?", a: "Yes, all models come with full commercial usage rights." },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Scale Breakers</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Break the mold. Make art. Explore your creative potential with Scale Breakers.</p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Explore</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/workshops" className="hover:text-white transition">Workshops</a></li>
                <li><a href="/products" className="hover:text-white transition">Products</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/services/3d-scanning" className="hover:text-white transition">3D Scanning</a></li>
                <li><a href="/services/murals" className="hover:text-white transition">Mural Art</a></li>
                <li><a href="/services/3d-modelling" className="hover:text-white transition">3D Modelling</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://instagram.com/scale.breakers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="https://www.facebook.com/TheScaleBreakers/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a></li>
                <li><a href="mailto:contact.scalebreakers@gmail.com" className="hover:text-white transition">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Scale Breakers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
