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
        <p className="text-foreground-muted text-sm mt-1">Administra tus preferencias de cuenta, audio y MIDI.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings Block */}
        <div className="p-6 border border-border bg-surface/45 rounded-3xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 border-b border-border pb-3">
            <User className="w-4.5 h-4.5 text-primary-light" />
            Información del Perfil
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground-subtle">Nombre Completo</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-bg-subtle text-foreground border border-border rounded-xl px-4 py-3 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground-subtle">Correo Electrónico</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full bg-bg-subtle text-foreground border border-border rounded-xl px-4 py-3 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Audio Engine Settings Block */}
        <div className="p-6 border border-border bg-surface/45 rounded-3xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 border-b border-border pb-3">
            <Volume2 className="w-4.5 h-4.5 text-secondary-light" />
            Motor de Audio y Conectividad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground-subtle">Latencia de Audio</label>
              <select
                value={audioLatency}
                onChange={(e) => setAudioLatency(e.target.value)}
                className="w-full bg-bg-subtle text-foreground border border-border rounded-xl px-4 py-3 text-xs focus:outline-none"
              >
                <option value="low">Baja (Recomendado para práctica en vivo)</option>
                <option value="balanced">Balanceada (Menos uso de procesador)</option>
                <option value="high">Estable (Evita cortes de sonido)</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-subtle rounded-xl border border-border">
              <div>
                <h4 className="text-xs font-bold text-white">Auto-seleccionar Dispositivo MIDI</h4>
                <p className="text-[10px] text-foreground-subtle leading-normal mt-0.5">Conecta automáticamente al encender el piano.</p>
              </div>
              <input
                type="checkbox"
                checked={midiDeviceAutoSelect}
                onChange={(e) => setMidiDeviceAutoSelect(e.target.checked)}
                className="w-4 h-4 accent-secondary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-6 border border-border bg-surface/45 rounded-3xl space-y-4">
          <h3 className="font-heading font-bold text-base text-white flex items-center gap-2 border-b border-border pb-3">
            <Shield className="w-4.5 h-4.5 text-accent" />
            Seguridad y Accesos
          </h3>
          <p className="text-xs text-foreground-muted leading-normal">
            Tu sesión está cifrada mediante tokens JWT de sesión única. No compartas tus credenciales MIDI ni claves API con terceros.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold text-xs rounded-xl shadow-lg shadow-glow-primary/15 transition-all flex items-center justify-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
