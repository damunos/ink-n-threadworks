import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db, signInWithGoogle, signOutUser } from "./firebase"; // Firebase utilities
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import Button from "./components/ui/Button";
import html2canvas from "html2canvas";
import logo from "./assets/logo.png";


// 🔹 Navbar Component
function Navbar({ user }) {
  return (
    <nav className="bg-gray-700 p-4 text-white flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="Ink N Threadworks Logo" className="h-12" />
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.displayName || user.email}</span>
            <Button onClick={signOutUser} className="bg-red-600 text-white px-4 py-2">Sign Out</Button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button className="bg-green-600 text-white px-4 py-2">Sign Up</Button>
            </Link>
            <Button onClick={signInWithGoogle} className="ml-2 bg-blue-600 text-white px-4 py-2">Sign In</Button>
          </>
        )}
      </div>
    </nav>
  );
}

// 🔹 Home Page Component
function Home({ user }) {
  const [items, setItems] = useState([]);
  const [templates, setTemplates] = useState([]);
  const gridSize = 20;

  // Save Template to Firestore
  const saveTemplate = async () => {
    if (!user) return alert("Please sign in to save your design!");
    const canvas = document.querySelector("canvas");
    const snapshot = await html2canvas(canvas);
    const imageData = snapshot.toDataURL("image/png");

    await addDoc(collection(db, "designs"), {
      userId: user.uid,
      design: [...items],
      preview: imageData,
      timestamp: new Date(),
    });

    alert("Design saved!");
  };

  // Load Templates from Firestore
  useEffect(() => {
    const loadTemplates = async () => {
      if (!user) return;
      const querySnapshot = await getDocs(collection(db, "designs"));
      const userTemplates = querySnapshot.docs
        .filter((doc) => doc.data().userId === user.uid)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setTemplates(userTemplates);
    };
    if (user) loadTemplates();
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar user={user} />
      
      <header className="text-center py-16 bg-white shadow-md">
        <h2 className="text-4xl font-bold text-black">Create Custom Apparel with Ease</h2>
        <p className="text-gray-700 mt-2">Upload your design, customize, and place your order in minutes!</p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Button className="bg-gray-700 text-white px-6 py-3 rounded-lg">Start Designing</Button>
        </motion.div>
      </header>

      {/* Design Tool */}
      <section className="p-6">
        <h3 className="text-2xl font-semibold text-black">Design Your Apparel</h3>
        <div className="bg-white p-4 shadow-md rounded-lg mt-4">
          <canvas className="border border-gray-500 w-full h-96" />

          <Button onClick={saveTemplate} className="mt-4 bg-gray-700 text-white px-4 py-2">Save Template</Button>
        </div>
      </section>
    </div>
  );
}

// 🔹 Sign Up Component
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created! You can now sign in.");
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 mt-2 rounded" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 mt-2 rounded" />
      <Button onClick={handleSignUp} className="w-full mt-4 bg-green-600 text-white px-4 py-2">Sign Up</Button>
    </div>
  );
}

// 🔹 Main App Component
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router basename="/Ink-N-Threadworks">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
