import React from 'react';
import { cn } from '@/lib/utils';
import { FaXTwitter } from 'react-icons/fa6';
import { 
  FaFacebookF, 
  FaFacebookMessenger, 
  FaInstagram, 
  FaDribbble, 
  FaBehance, 
  FaWhatsapp, 
  FaLinkedinIn, 
  FaYoutube,
  FaGithub,
  FaCodepen,
  FaDev,
  FaMedium,
  FaStackOverflow,
  FaReddit,
  FaPinterest,
  FaTelegram,
  FaSlack,
  FaDiscord,
  FaTiktok,
  FaSpotify,
  FaSoundcloud,
  FaTwitch,
  FaVimeo,
  FaSnapchat,
  FaSkype,
  FaArtstation
} from 'react-icons/fa';

interface SocialIconsProps {
  name: string;
  className?: string;
  size?: number;
}

const iconComponents = {
  'Facebook': FaFacebookF,
  'Messenger': FaFacebookMessenger,
  'Instagram': FaInstagram,
  'Dribbble': FaDribbble,
  'Behance': FaBehance,
  'WhatsApp': FaWhatsapp,
  'LinkedIn': FaLinkedinIn,
  'Twitter': FaXTwitter,
  'YouTube': FaYoutube,
  'GitHub': FaGithub,
  'CodePen': FaCodepen,
  'Dev': FaDev,
  'Medium': FaMedium,
  'StackOverflow': FaStackOverflow,
  'Reddit': FaReddit,
  'Pinterest': FaPinterest,
  'Telegram': FaTelegram,
  'Slack': FaSlack,
  'Discord': FaDiscord,
  'TikTok': FaTiktok,
  'Spotify': FaSpotify,
  'SoundCloud': FaSoundcloud,
  'Twitch': FaTwitch,
  'Vimeo': FaVimeo,
  'Snapchat': FaSnapchat,
  'Skype': FaSkype,
  'ArtStation': FaArtstation
} as const;

const brandColors = {
  'Facebook': '#1877F2',
  'Messenger': '#0084FF',
  'Instagram': '#E1306C',
  'Dribbble': '#EA4C89',
  'Behance': '#1769FF',
  'WhatsApp': '#25D366',
  'LinkedIn': '#0077B7',
  'Twitter': '#FFFFFF', // Using white for better visibility on dark backgrounds
  'YouTube': '#FF0000',
  'GitHub': '#181717',
  'CodePen': '#000000',
  'Dev': '#0A0A0A',
  'Medium': '#12100E',
  'StackOverflow': '#F48024',
  'Reddit': '#FF4500',
  'Pinterest': '#E60023',
  'Telegram': '#2AABEE',
  'Slack': '#4A154B',
  'Discord': '#5865F2',
  'TikTok': '#000000',
  'Spotify': '#1DB954',
  'SoundCloud': '#FF5500',
  'Twitch': '#9146FF',
  'Vimeo': '#1AB7EA',
  'Snapchat': '#FFFC00',
  'Skype': '#00AFF0',
  'ArtStation': '#13AFF0'
} as const;

export default function SocialIcons({ name, className, size = 24 }: SocialIconsProps) {
  const IconComponent = iconComponents[name as keyof typeof iconComponents];
  const brandColor = brandColors[name as keyof typeof brandColors] || '#666666';

  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return (
    <div className={cn('group', className)}>
      <IconComponent 
        size={size}
        className="text-gray-600 transition-colors duration-200 group-hover:scale-110"
        style={{
          color: brandColor,
          opacity: 0.7,
          transition: 'all 0.2s ease-in-out',
        }}
      />
    </div>
  );
}
