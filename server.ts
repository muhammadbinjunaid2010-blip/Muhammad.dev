import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initializeApp } from "firebase/app";
import { 
  initializeFirestore, 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";

// Load firebase-applet-config.json for dynamic initialization
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "firebase-applet-config.json"), "utf8"));

// Initialize Firebase client SDK configured for server usage to access the named database securely
const firebaseApp = initializeApp(firebaseConfig);
const dbAdmin = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId);

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'Pizza al Volo',
    name: 'Pizza al Volo',
    tagline: 'Authentic Roman Craft & High-Performance Culinary Architecture',
    desc: 'Redefining Roman street food through an elite digital portal. A study in high-contrast typography and wood-fired performance engineering.',
    challenge: 'A legendary Roman pizzeria needed a digital presence that matched the intensity of their 450°C wood-fired ovens. The existing interface was cold and lacked the "Authentic Craft" required to capture their high-end artisanal positioning in a competitive European market.',
    solution: 'I architected a high-contrast editorial experience that mirrors the precision of Roman pizza prep. By leveraging fluid motion transitions and sharp serif typography, I captured the heat and heritage of the wood-fired process. The result is a high-performance portal that saw a 300% increase in international reservations and digital engagement.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=800&auto=format&fit=crop',
    preview: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop',
    color: 'from-red-600/20 to-orange-900/20',
    liveLink: 'https://pizzaalvolo.vercel.app',
    order: 1
  },
  {
    id: '2',
    title: 'Aurelius Citadel',
    name: 'Aurelius Citadel',
    tagline: 'High-Stakes Institutional Branding & User Ecosystems',
    desc: 'Architecting a prestigious physical-meets-digital hub. A case study in luxury branding and high-stakes user flow optimization.',
    challenge: 'A prestigious physical institution that lacked a digital counterpart capable of reflecting its elite standards. The fragmented digital experience resulted in friction for stakeholders and a dilution of the academy\'s prestigious identity.',
    solution: 'I engineered a unified "Digital Citadel"—a high-performance ecosystem that manages complex user flows while maintaining architectural rigor. Using advanced CSS variables for dynamic theming and high-end motion transitions, the platform serves as a benchmarks for modern educational systems.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    preview: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    color: 'from-indigo-600/20 to-blue-900/20',
    liveLink: 'https://aurelius-academy-official.vercel.app/',
    order: 2
  },
  {
    id: '3',
    title: 'Palo Drive Thru Cafe',
    name: 'Palo Drive Thru Cafe',
    tagline: 'Drive-Thru Specialty Coffee & High-Velocity Transit Architecture',
    desc: 'A lightning-fast specialty coffee drive-thru portal set in Melton, Victoria. Maximizing velocity for commuters without sacrificing artisanal warmth.',
    challenge: 'Based in Melton, Victoria, this premier drive-thru cafe needed an elegant, streamlined online ordering interface that matched the quick transit speed of coffee enthusiasts. The challenge lay in creating a layout that maintains warmth and rich aesthetic identity while delivering ultra-fast loading times and effortless navigation on mobile devices.',
    solution: 'I engineered a lightning-fast, highly intuitive digital portal for high-velocity commuters. Combining robust, high-performance responsive frameworks with elegant beverage photography and fluid ordering layout motions, the portal maximizes transit efficiency without sacrificing the artisanal warmth of specialty coffee.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    preview: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=1200&auto=format&fit=crop',
    color: 'from-amber-650/20 to-orange-950/20',
    liveLink: 'https://palo-drivethru.vercel.app',
    order: 3
  },
  {
    id: '4',
    title: 'Jays Roofing',
    name: 'Jays Roofing',
    tagline: 'Premium Domestic Shielding & Structural Digital Engineering',
    desc: 'A premium digital branding portal for elite roofing craftsmen in Melton, Victoria. Engineered for resilience and sharp architectural display.',
    challenge: 'Situated in Melton, Victoria, Jays Roofing required an assertive digital presence that properly showcases their resilient structural work. The existing service catalog missed the clean premium positioning necessary to attract high-end residential and commercial building developments.',
    solution: 'I engineered a minimalist, high-impact branding platform showcasing top-tier steel and tile craftsmanship. By employing sleek high-contrast components, fine-tuned layouts, and lightning-fast lazy-loaded galleries, the workspace captures the absolute precision and security of their roofing solutions.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    wireframe: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    preview: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=1200&auto=format&fit=crop',
    color: 'from-slate-700/20 to-zinc-900/20',
    liveLink: 'https://jays-roofing.vercel.app',
    order: 4
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Secure Auth State
  const MO_SESSION_TOKEN = "mo-secure-dev-session-token-9831";

  // Developer Login endpoint
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    // Accept "mo", "mo@mo.dev", or muhammadbinjunaid2010@gmail.com
    const isValidUser = username === "mo" || username === "mo@mo.dev" || username === "muhammadbinjunaid2010@gmail.com";
    const isValidPass = password === "m_1098";

    if (isValidUser && isValidPass) {
      res.json({
        success: true,
        token: MO_SESSION_TOKEN,
        user: { name: "Mo", role: "developer", email: "mo@mo.dev" }
      });
    } else {
      res.status(401).json({ error: "Invalid developer credentials." });
    }
  });

  // Admin Middleware
  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader === `Bearer ${MO_SESSION_TOKEN}`) {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized access to developer console." });
    }
  };

  // Public - Create a new Message (Contact inquiry proxy)
  app.post("/api/messages", async (req, res) => {
    try {
      const { name, email, objective, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const pPayload = {
        name,
        email,
        objective: objective || "New Project",
        message,
        adminSecret: MO_SESSION_TOKEN,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(dbAdmin, "messages"), pPayload);
      res.json({ success: true, id: docRef.id });
    } catch (error: any) {
      console.error("Error creating dynamic message proxy:", error);
      res.status(500).json({ error: error.message || "Failed to transmit message." });
    }
  });

  // Admin - Get All Inquiries/Messages
  app.get("/api/admin/messages", requireAdmin, async (req, res) => {
    try {
      const q = query(
        collection(dbAdmin, "messages"),
        where("adminSecret", "==", MO_SESSION_TOKEN),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const messages: any[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        let formattedDate = data.createdAt;
        if (data.createdAt && typeof data.createdAt.toDate === "function") {
          formattedDate = data.createdAt.toDate().toISOString();
        }
        messages.push({
          id: docSnap.id,
          ...data,
          createdAt: formattedDate
        });
      });
      res.json(messages);
    } catch (error: any) {
      console.error("Error fetching messages via admin:", error);
      res.status(500).json({ error: error.message || "Failed to retrieve messages." });
    }
  });

  // Admin - Delete an Inquiry/Message
  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const docRef = doc(dbAdmin, "messages", id);
      await updateDoc(docRef, { markedForDeletion: true, adminSecret: MO_SESSION_TOKEN });
      await deleteDoc(docRef);
      res.json({ success: true, message: "Inquiry successfully cleared." });
    } catch (error: any) {
      console.error("Error deleting message via admin:", error);
      res.status(500).json({ error: error.message || "Failed to delete message." });
    }
  });

  // Public - Get All Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const q = query(collection(dbAdmin, "projects"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const pList: any[] = [];
      snapshot.forEach(docSnap => {
        pList.push({ id: docSnap.id, ...docSnap.data() });
      });

      if (pList.length === 0) {
        return res.json(DEFAULT_PROJECTS);
      }
      res.json(pList);
    } catch (error: any) {
      console.error("Error getting public projects list:", error);
      res.json(DEFAULT_PROJECTS);
    }
  });

  // Admin - Add a new Project
  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const pData = req.body;
      if (typeof pData.order !== "number") {
        pData.order = Date.now();
      }
      const pPayload = {
        ...pData,
        adminSecret: MO_SESSION_TOKEN,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(dbAdmin, "projects"), pPayload);
      res.json({ success: true, id: docRef.id });
    } catch (error: any) {
      console.error("Error adding project:", error);
      res.status(500).json({ error: error.message || "Failed to create project." });
    }
  });

  // Admin - Edit an existing Project
  app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const uData = req.body;
      delete uData.id;
      delete uData.createdAt;

      const docRef = doc(dbAdmin, "projects", id);
      await updateDoc(docRef, {
        ...uData,
        adminSecret: MO_SESSION_TOKEN,
        updatedAt: new Date().toISOString()
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: error.message || "Failed to update project." });
    }
  });

  // Admin - Delete an existing Project
  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const docRef = doc(dbAdmin, "projects", id);
      await updateDoc(docRef, { markedForDeletion: true, adminSecret: MO_SESSION_TOKEN });
      await deleteDoc(docRef);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: error.message || "Failed to delete project." });
    }
  });

  // Admin - Seed Default Projects to database
  app.post("/api/admin/projects/seed", requireAdmin, async (req, res) => {
    try {
      // Clear existing projects
      const q = query(collection(dbAdmin, "projects"));
      const snapshot = await getDocs(q);
      for (const docSnap of snapshot.docs) {
        const docRef = doc(dbAdmin, "projects", docSnap.id);
        await updateDoc(docRef, { markedForDeletion: true, adminSecret: MO_SESSION_TOKEN });
        await deleteDoc(docRef);
      }

      // Write defaults
      for (const proj of DEFAULT_PROJECTS) {
        const docData = { ...proj };
        const id = docData.id;
        delete docData.id;
        const docRef = doc(dbAdmin, "projects", id);
        await setDoc(docRef, {
          ...docData,
          adminSecret: MO_SESSION_TOKEN,
          createdAt: new Date().toISOString()
        });
      }
      res.json({ success: true, message: "Successfully populated default projects." });
    } catch (error: any) {
      console.error("Error seeding default projects:", error);
      res.status(500).json({ error: error.message || "Failed to seed default database." });
    }
  });

  // API route for secure chatbot proxy
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userMessage, estimateContext } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const SYSTEM_INSTRUCTION = `You are "Nova", the serious, concise, and strategically intelligent digital representative for Mo. Use professional, direct language.

Profile:
- Identity: Mo, a high-end web developer and architectural designer.
- Status: A young, fresh mind with prodigious talent in engineering and aesthetics. 
- Strategic Constraint: Never state Mo's exact age. If queried, describe him as a "young, fresh mind" or "prodigious talent" who has bypassed conventional learning curves.
- Location: Operating globally. Mo works with clients from all over the world. A physical office is currently being established in Australia.
- Hobbies: Solving complex architectural code, minimalist design research, and high-performance profiling.
- Playground: You are the authority on the experiments: Clock-of-Clocks, New Year transition, Holo-Card shader, Galaxy singularity, and the BB-8 theme switcher.

Protocol:
1. BREVITY: Keep answers extremely short and to the point.
2. NO BOLDING: Never use bold markdown (**) in your responses.
3. PERSONALITY: Analytical, serious, and sophisticated.
4. STRATEGY: Be smart and slightly cryptic about personal details to maintain professional intrigue. Focus on his global reach and future Australian expansion.`;

      let finalSystemInstruction = SYSTEM_INSTRUCTION;
      if (estimateContext && estimateContext.total > 450) {
        finalSystemInstruction += `\n\nCURRENT ESTIMATOR TELEMETRY RECEIVED:
The user is currently configuring a project in Mo's Cost Calculator.
- Industry: ${estimateContext.businessType}
- Region: ${estimateContext.city}
- Selected Modules: ${estimateContext.selectedPages.join(', ') || 'None yet'}
- Selected Logic Features: ${estimateContext.selectedFeatures.join(', ') || 'None' }
- Projected Cost: AUD $${estimateContext.total}
Intelligently comment or advise on this exact setup if the user is asking about pricing, estimates, what they can get, or how to design their site. Describe the custom UI preview (glowing tech dark mode, earthy artisanal cafe menu layout, fashion luxury catalog, etc.) that we render for them in the estimator sidebar.`;
      }

      // Structure content parts for Gemini GenAI chat representation
      const contents = [
        ...messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: finalSystemInstruction,
          maxOutputTokens: 500,
          tools: [{ googleSearch: {} }]
        }
      });

      // Extract URLs from grounding metadata
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = groundingChunks ? groundingChunks.map((chunk: any) => ({
        title: chunk.web?.title || chunk.web?.uri || "Web Resource",
        uri: chunk.web?.uri
      })).filter((s: any) => s.uri) : [];

      res.json({ text: response.text, sources });
    } catch (error: any) {
      console.error("Gemini API Error in proxy server:", error);
      res.status(500).json({ error: error.message || "An error occurred while generating AI response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
