"use client";

import Image from "next/image";
import {
  User,
  Bell,
  ShieldCheck,
  Lock,
  MessageCircle,
  EyeOff,
  History,
  Repeat2,
  ShieldUser,
  BookA,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { GetById, GetProfile, UpdateUserImage, UpdateUserProfile } from "@/reducers/apiProfile";
import { useEffect, useRef, useState } from "react";

export default function EditProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  const { dataById, isLoading } = useSelector(
    (state: RootState) => state.counter
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState<number>(0);
  const api = 'https://instagram-api.softclub.tj'
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    try {
      await dispatch(UpdateUserImage(file)).unwrap();
      dispatch(GetProfile());
      dispatch(GetById(userId));
    } catch (err) {
      console.error(err);
      alert("Avatar upload failed");
    }
  };


  const params = useParams();
  const userId = params.id as string;

  useEffect(() => {
    if (userId) {
      dispatch(GetById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (dataById) {
      setFirstName(dataById.firstName || "");
      setLastName(dataById.lastName || "");
      setAbout(dataById.about || "");
      setGender(dataById.gender ?? 0);
    }
  }, [dataById]);

  const handleSubmit = async () => {
    try {
      await dispatch(
        UpdateUserProfile({
          about,
          gender,
        })
      ).unwrap();

      dispatch(GetProfile());

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };


  if (isLoading || !dataById) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex w-[82%] ml-auto">
      <aside className="w-[340px] border-r px-6 py-8 text-sm">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        <div className="rounded-2xl p-4 mb-8 bg-muted">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 font-semibold">Meta</span>
            <span className="text-muted-foreground">
              Accounts Center
            </span>
          </div>

          <p className="text-muted-foreground mb-4">
            Manage connected experiences and account settings across Meta technologies.
          </p>

          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">
              <User size={16} /> Personal details
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} /> Password and security
            </li>
            <li className="flex items-center gap-2">
              <Bell size={16} /> Ad preferences
            </li>
          </ul>

          <button className="text-blue-600 mt-4">
            See more in Accounts Center
          </button>
        </div>
        <p className="text-muted-foreground mb-3">
          How you use Instagram
        </p>

        <button className="w-full flex items-center gap-3 bg-muted rounded-xl px-4 py-3 mb-2">
          <User size={18} />
          Edit profile
        </button>

        <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground hover:bg-muted">
          <Bell size={18} />
          Notifications
        </button>
        <p className="text-muted-foreground mb-3 mt-6">
          Who can see your content
        </p>

        <SidebarButton icon={<Lock size={18} />} label="Account privacy" />
        <SidebarButton icon={<User size={18} />} label="Close friends" />
        <SidebarButton icon={<EyeOff size={18} />} label="Blocked" />
        <SidebarButton icon={<History size={18} />} label="Story and location" />
        <p className="text-muted-foreground mb-3 mt-6">
          How others can interact with you
        </p>

        <SidebarButton
          icon={<MessageCircle size={18} />}
          label="Messages and story replies"
          active
        />
        <SidebarButton icon={<User size={18} />} label="Tags and mentions" />
        <SidebarButton icon={<MessageCircle size={18} />} label="Comments" />
        <SidebarButton icon={<Repeat2 size={18} />} label="Reposts" />
        <SidebarButton icon={<ShieldUser size={18} />} label="Restricted accounts" />
        <SidebarButton icon={<BookA size={18} />} label="Hidden words" />
      </aside>
      <main className="flex-1 px-12 py-10 overflow-y-auto max-w-[700px]">
        <h2 className="text-2xl font-bold mb-8">
          Edit profile
        </h2>
        <div className="rounded-2xl p-6 flex items-center justify-between mb-10 bg-muted">
          <div className="flex items-center gap-4">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="preview"
                className="rounded-full object-cover w-[64px] h-[64px]"
              />
            ) : dataById.image ? (
              <img
                src={`${api}/images/${dataById.image}`}
                alt="avatar"
                className="rounded-full object-cover w-[64px] h-[64px]"
              />
            ) : (
              <Image
                src="/user.png"
                alt="default avatar"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold">{dataById.userName}</p>
              <p><span>{dataById.firstName} {dataById.lastName}</span></p>
            </div>
          </div>

          <button
            onClick={handleChangePhotoClick}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Change photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

        </div>
        <label>First name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm mb-3"
        />
        <label>Last name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm mb-3"
        />
        <div className="mb-8">
          <label className="block mb-2 font-semibold">
            Website
          </label>
          <input
            disabled
            placeholder="Website"
            className="w-full border rounded-xl px-4 py-3 text-sm bg-muted"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Website links can only be changed on mobile.
          </p>
        </div>
        <div className="mb-8">
          <label className="block mb-2 font-semibold">
            Bio
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            maxLength={150}
            className="w-full h-28 border rounded-xl px-4 py-3 text-sm resize-none"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">
            0 / 150
          </div>
        </div>
        <div className="mb-10">
          <label className="block mb-2 font-semibold">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
            className="w-full border rounded-xl px-4 py-3 dark:bg-black text-sm"
          >
            <option value={0}>Prefer not to say</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>
        <div className="flex items-center justify-between border-t pt-6 mb-10">
          <div>
            <p className="font-semibold">
              Show Threads badge
            </p>
            <p className="text-sm text-muted-foreground">
              The badge will appear next to your username
            </p>
          </div>

          <input type="checkbox" className="w-5 h-5" />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Submit
        </button>
      </main>
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 mb-1
        ${active ? "bg-muted" : "text-muted-foreground hover:bg-muted"}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function FormField({
  label,
  placeholder,
  hint,
}: {
  label: string;
  placeholder: string;
  hint?: string;
}) {
  return (
    <div className="mb-8">
      <label className="block mb-2 font-semibold">
        {label}
      </label>
      <input
        className="w-full border rounded-xl px-4 py-3 text-sm"
        placeholder={placeholder}
      />
      {hint && (
        <p className="text-xs text-muted-foreground mt-1">
          {hint}
        </p>
      )}
    </div>
  );
}
