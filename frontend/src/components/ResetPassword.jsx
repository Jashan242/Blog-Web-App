import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    setOtp(newOtp);

    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const resetOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Reset email sent successfully");
        setReset(true);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPass: password,
          otp: otp.join(""),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Password reset successfully");
        navigate("/");
        setReset(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-8 justify-center items-center bg-[#FAFAFA]">
    <div className="flex flex-col items-center gap-4">
    <h1 className="text-6xl font-bold text-[#111e25]">Wordy Vibes</h1>
    <p className="text-md font-semibold">"Forgot your password? Don't worry, we've got you covered!"</p>
    </div>
     
      <form className="flex flex-col gap-6 p-8 bg-white shadow-xl rounded-lg">
       
        <h1 className="text-[#111e25] text-2xl font-semibold mb-4 text-center">Reset Your Password Here...</h1>
        
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="py-2 px-4 w-72 rounded-md border border-gray-300 outline-none focus:border-[#111e25]"
          required
        />

        {reset && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-center">Enter the 6-digit OTP sent to your email:</p>
            <div className="flex gap-2 justify-center">
              {otp.map((_, index) => (
                <input
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  key={index}
                  className="w-12 h-12 text-center font-bold text-xl border-2 border-[#111e25] rounded-md outline-none focus:bg-gray-200"
                  onChange={(e) => handleOtpChange(e, index)}
                />
              ))}
            </div>
            
            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 w-72 rounded-md border border-gray-300 outline-none focus:border-[#111e25]"
              required
            />

            <button
              type="submit"
              onClick={handlePasswordReset}
              className="bg-[#111e25] text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-white hover:text-[#111e25] border-2 border-[#111e25] transition"
            >
              Reset Password
            </button>
          </div>
        )}

        {!reset && (
          <button
            type="submit"
            onClick={resetOtp}
            className="bg-[#111e25] text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-white hover:text-[#111e25] border-2 border-[#111e25] transition"
          >
            Send Email
          </button>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
