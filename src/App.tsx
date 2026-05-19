/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Cursor } from './components/Cursor';
import { Background } from './components/Background';
import { ProjectCaseStudy } from './components/ProjectCaseStudy';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useStore } from './store/useStore';
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './components/admin/Dashboard';
import { ProjectsAdmin } from './components/admin/ProjectsAdmin';
import { AboutAdmin } from './components/admin/AboutAdmin';
import { ExperienceAdmin } from './components/admin/ExperienceAdmin';
import { MessagesAdmin } from './components/admin/MessagesAdmin';
import { ConfigAdmin } from './components/admin/ConfigAdmin';
import { useClickSound } from './hooks/useClickSound';

export default function App() {
  const darkMode = useStore((state) => state.darkMode);
  useClickSound();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                 <main className="min-h-screen cursor-none">
                    <Background />
                    <Cursor />
                    <Navbar />
                    <Hero />
                    <TechMarquee />
                    <section id="work">
                        <ProjectCaseStudy />
                    </section>
                    <About />
                    <Process />
                    <Testimonials />
                    <Contact />
                    <Footer />
                  </main>
                } />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="projects" element={<ProjectsAdmin />} />
                    <Route path="about" element={<AboutAdmin />} />
                    <Route path="experience" element={<ExperienceAdmin />} />
                    <Route path="messages" element={<MessagesAdmin />} />
                    <Route path="config" element={<ConfigAdmin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
