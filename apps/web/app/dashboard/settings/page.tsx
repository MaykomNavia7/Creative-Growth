"use client";

import { useState } from "react";
import { Save, Shield, Volume2, User } from "lucide-react";

export default function SettingsPage() {
  const [profileName, setProfileName] = useState("Juan Doe");
  const [profileEmail, setProfileEmail] = useState("juan.doe@creativegrowth.com");
  const [audioLatency, setAudioLatency] = useState("low");
  const [midiDeviceAutoSelect, setMidiDeviceAutoSelect] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Configuración guardada correctamente.");
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h1 className="font-heading font-extrabold text-3xl text-white">Configuración</h1>
        <p className="text-slate-400 text-sm mt-1">Administra tus preferencias de cuenta, audio y MIDI.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings Block */}
        <div className="p-6 border border-white/5 bg-[#07041c]/45 rounded-3xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <User className="w-4.5 h-4.5 text-violet-400" />
            Información del Perfil
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Nombre Completo</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#030014] text-slate-200 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Correo Electrónico</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full bg-[#030014] text-slate-200 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Audio Engine Settings Block */}
        <div className="p-6 border border-white/5 bg-[#07041c]/45 rounded-3xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Volume2 className="w-4.5 h-4.5 text-teal-400" />
            Motor de Audio y Conectividad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">Latencia de Audio</label>
              <select
                value={audioLatency}
                onChange={(e) => setAudioLatency(e.target.value)}
                className="w-full bg-[#030014] text-slate-300 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none"
              >
                <option value="low">Baja (Recomendado para práctica en vivo)</option>
                <option value="balanced">Balanceada (Menos uso de procesador)</option>
                <option value="high">Estable (Evita cortes de sonido)</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#030014] rounded-xl border border-white/5">
              <div>
                <h4 className="text-xs font-bold text-white">Auto-seleccionar Dispositivo MIDI</h4>
                <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Conecta automáticamente al encender el piano.</p>
              </div>
              <input
                type="checkbox"
                checked={midiDeviceAutoSelect}
                onChange={(e) => setMidiDeviceAutoSelect(e.target.checked)}
                className="w-4 h-4 accent-teal-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-6 border border-white/5 bg-[#07041c]/45 rounded-3xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Shield className="w-4.5 h-4.5 text-rose-400" />
            Seguridad y Accesos
          </h3>
          <p className="text-xs text-slate-400 leading-normal">
            Tu sesión está cifrada mediante tokens JWT de sesión única. No compartas tus credenciales MIDI ni claves API con terceros.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-500/10 transition-all flex items-center justify-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
