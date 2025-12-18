import React from 'react'
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
    return (
        <footer className='bg-amber-50  py-15 '>
            <div className='max-w-6xl mx-auto grid grid-cols-1 rid-cols-1 md:grid-cols-4 gap-8 px-6'>

                <div>
                    <h2 className="text-black text-xl font-bold mb-3">MediZone</h2>
                    <p className="text-sm text-black">
                        Your trusted partner for medical equipment and healthcare needs.
                    </p>
                </div>

                <div>
                    <h3 className="text-black font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className=" text-blue-600 hover:text-black">Home</Link></li>
                        <li><Link to="/products" className=" text-blue-600 hover:text-black">Products</Link></li>
                        <li><Link to="/profile" className=" text-blue-600 hover:text-black">Profile</Link></li>
                        <li><Link to="/contact" className=" text-blue-600 hover:text-black">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-black font-semibold mb-3">Categories</h3>
                    <ul className="space-y-2 text-black text-sm">
                        <li>Surgical</li>
                        <li>Diagnostics</li>
                        <li>Personal Care</li>
                        <li>Pharmacy</li>
                        <li>Therapy & Emergency</li>
                        <li>Equipment / Furniture</li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-black font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm text-black">📍 123 Health Street, Medical City</p>
                    <p className="text-sm text-black">📞 +91 98765 43210</p>
                    <p className="text-sm text-black flex items-center gap-1">
                        <Mail className="h-4 w-4" /> support@medizone.com
                    </p>

                    <div className="flex space-x-4 mt-4">
                        <a href="#" className=" text-blackhover:text-black"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-black"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-black"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray">
                © {new Date().getFullYear()} MediZone. All rights reserved.
            </div>




        </footer>


    )
}

export default Footer