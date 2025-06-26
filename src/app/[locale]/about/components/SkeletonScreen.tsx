import React from 'react';

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  socialLinks: SocialLink[];
}

interface HeaderProps {
  profileData: ProfileData;
}

export default function Header({ profileData }: HeaderProps) {
  return (
    <header className="text-center mb-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
        {profileData.name}
      </h1>
      <p className="text-lg sm:text-xl text-blue-100 mb-6">
        {profileData.title}
      </p>

      <section className="flex flex-wrap items-center justify-center gap-4 text-blue-100 mb-6">
        <section className="flex items-center gap-2">
          <span>📍</span>
          <span>{profileData.location}</span>
        </section>
        <section className="flex items-center gap-2">
          <span>✉️</span>
          <span>{profileData.email}</span>
        </section>
      </section>

      <section className="flex flex-wrap justify-center gap-3">
        {profileData.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white"
          >
            {link.platform}
          </a>
        ))}
      </section>
    </header>
  );
}
