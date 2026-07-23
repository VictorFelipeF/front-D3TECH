import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CurrentUser {
  username: string;
  avatarUrl: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { username: string; avatarUrl: string }) => void;
  currentUser: CurrentUser;
}

export function ProfileModal({
  isOpen,
  onClose,
  onSave,
  currentUser,
}: ProfileModalProps) {
  const [username, setUsername] = useState(currentUser.username);
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatarUrl);

  useEffect(() => {
    setUsername(currentUser.username);
    setAvatarPreview(currentUser.avatarUrl);
  }, [currentUser, isOpen]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit() {
    // TODO: fazer upload real do arquivo pro backend/storage quando linkado
    onSave({ username, avatarUrl: avatarPreview });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Meu perfil">
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden flex items-center justify-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl text-muted-foreground">👤</span>
          )}
        </div>
        <label className="text-sm text-d3-purple cursor-pointer">
          Trocar Foto
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="mb-6">
        <Label htmlFor="username">Nome de Usuario</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit}>Salvar</Button>
      </div>
    </Modal>
  );
}
