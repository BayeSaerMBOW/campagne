/* src/components/SignupForm.jsx */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Key, Hash, UserCircle } from "lucide-react";

const Settings = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-200 via-red-100 to-orange-300">
      <div className="bg-white shadow-2xl rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create New Account
        </h2>

        <form className="space-y-4">
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-orange-400 shadow-sm">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  <User size={36} />
                </div>
              )}
            </div>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="photo"
              className="cursor-pointer bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition-all duration-300 mt-2"
            >
              Choose Photo
            </label>
          </div>

          {/* Input Fields */}
          {[
            { icon: User, placeholder: "Full Name", type: "text" },
            { icon: Mail, placeholder: "Login", type: "text" },
            { icon: Mail, placeholder: "Email", type: "email" },
            { icon: Key, placeholder: "Password", type: "password" },
            { icon: Hash, placeholder: "Matricule", type: "tel" },
          ].map((field, index) => (
            <div className="relative" key={index}>
              <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-300"
                required
              />
            </div>
          ))}

          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-300"
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="marketer">Marketer</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-transform transform hover:-translate-y-1 duration-300 mt-4"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
