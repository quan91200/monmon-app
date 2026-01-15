import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IoPlayBack, IoPlayForward, IoPlay, IoPause, IoClose,
  IoList, IoChevronDown
} from "react-icons/io5";
import { TbMinimize } from "react-icons/tb";
import { BiExpand } from "react-icons/bi";
import { useMusic } from '../context/MusicContext';
import postData from '../api/users.json';

/**
 * MarqueeText - A sub-component that scrolls text only if it overflows its container.
 */
const MarqueeText = ({ text, className, containerClassName, hoverOnly = false }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setShouldMarquee(textRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    setTimeout(checkOverflow, 100);

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`marquee-container ${containerClassName} ${hoverOnly ? 'hover-marquee' : ''}`}
    >
      <div className={`flex ${shouldMarquee ? (hoverOnly ? 'animate-marquee-hover' : 'animate-marquee') : 'justify-center'}`}>
        <span ref={textRef} className={`${className} whitespace-nowrap ${shouldMarquee ? 'pr-10' : ''}`}>
          {text}
        </span>
        {shouldMarquee && (
          <span className={`${className} whitespace-nowrap pr-10`}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

const MusicPlayer = () => {
  const {
    isPlaying,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    playTrack,
    stopPlayer,
    isPlayerVisible,
    isMiniMode,
    setIsMiniMode,
    playlist
  } = useMusic();

  const { t } = useTranslation('global');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isMobilePlaylistOpen, setIsMobilePlaylistOpen] = useState(false);

  if (!isPlayerVisible || !currentTrack) return null;

  return (
    <>
      {/* Desktop Bar Player */}
      <div
        className={`hidden ipad-v:flex fixed bottom-0 left-0 w-full z-[100] px-10 pb-6
          ${isMiniMode
            ? 'animate-fade-left-to-right pointer-events-none'
            : 'animate-fade-right-to-left'}`}
      >
        <div className="app-container">
          <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl rounded-[32px] border border-white/20 dark:border-gray-800/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between px-8 py-4 relative">

            {/* Track Info - Click to minimize */}
            <div
              className="flex items-center gap-4 w-1/3 group/player cursor-pointer"
              onClick={() => setIsMiniMode(true)}
              title={t('music.minimize')}
            >
              <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 relative flex-shrink-0 transition-all duration-500
                ${isPlaying ? 'music-disc-playing border-pink-500' : 'music-disc-paused border-white/50'}`}>
                <img src={postData.metadata.logo} alt={currentTrack.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/player:opacity-100 flex items-center justify-center transition-opacity">
                  <TbMinimize className="text-white text-xl" />
                </div>
              </div>
              <MarqueeText
                text={currentTrack.title}
                containerClassName="max-w-[200px]"
                className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-wider"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 justify-center w-1/3">
              <button
                onClick={prevTrack}
                className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors"
              >
                <IoPlayBack size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transform transition-all active:scale-90"
              >
                {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} className="translate-x-0.5" />}
              </button>
              <button
                onClick={nextTrack}
                className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors"
              >
                <IoPlayForward size={24} />
              </button>
            </div>

            {/* Extra Actions */}
            <div className="flex items-center justify-end gap-2 w-1/3">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`p-2 rounded-full transition-colors ${isDropdownOpen ? 'bg-pink-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
                  title={t('music.playlist')}
                >
                  <IoList size={22} />
                </button>

                {/* Playlist Dropdown Content */}
                {isDropdownOpen && (
                  <div className="absolute bottom-full right-0 mb-4 w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-[24px] shadow-2xl border border-white/20 dark:border-gray-800/50 overflow-hidden animate-fade-in">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <span className="font-bold text-sm tracking-widest uppercase opacity-50">{t('music.playlist')}</span>
                      <button onClick={() => setIsDropdownOpen(false)}><IoClose /></button>
                    </div>
                    <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
                      {playlist.map((track, index) => (
                        <button
                          key={track.id}
                          onClick={() => {
                            playTrack(index);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center px-4 py-3 gap-3 hover:bg-pink-500/10 transition-colors text-left hover-marquee
                            ${currentTrack.id === track.id ? 'text-pink-500 bg-pink-500/5' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                            <img src={postData.metadata.logo} alt="" className="w-full h-full object-cover" />
                          </div>

                          <MarqueeText
                            text={track.title}
                            hoverOnly={true}
                            containerClassName="flex-grow"
                            className="text-sm font-bold"
                          />

                          {currentTrack.id === track.id && isPlaying && (
                            <div className="ml-auto flex gap-0.5 items-end h-3">
                              <div className="w-0.5 bg-pink-500 animate-[bounce_0.6s_infinite]"></div>
                              <div className="w-0.5 bg-pink-500 animate-[bounce_0.8s_infinite]"></div>
                              <div className="w-0.5 bg-pink-500 animate-[bounce_0.7s_infinite]"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={stopPlayer}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                title={t('music.turn_off')}
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Mini Mode Disc */}
      {isMiniMode && (
        <div className="hidden ipad-v:flex fixed bottom-28 right-10 z-[70] animate-fade-in group">
          <div className="relative">
            <div
              onClick={() => setIsMiniMode(false)}
              className={`w-16 h-16 rounded-full border-4 shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-110 
                ${isPlaying ? 'music-disc-playing border-pink-500' : 'music-disc-paused border-gray-900'}`}
              title={t('music.expand')}
            >
              <img src={postData.metadata.logo} alt="disc" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <BiExpand size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-75"></div>
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Disc Player */}
      <div className="ipad-v:hidden fixed bottom-44 right-5 z-[70] animate-fade-in">
        <div className="relative">
          <div
            onClick={() => setIsMobileModalOpen(true)}
            className={`w-16 h-16 rounded-full border-4 shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer
              ${isPlaying ? 'music-disc-playing border-pink-500' : 'music-disc-paused border-gray-900'}`}
          >
            <img src={postData.metadata.logo} alt="disc" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              {!isPlaying && <IoPlay size={24} className="text-white translate-x-0.5" />}
              {isPlaying && <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_#ec4899]"></div>}
            </div>
            {/* Vinyl grooves effect */}
            <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-75"></div>
            <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-50"></div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              stopPlayer();
            }}
            className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-500 hover:text-pink-500 transition-colors z-10"
            title={t('music.turn_off')}
          >
            <IoClose size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Music Modal */}
      {isMobileModalOpen && (
        <div className="ipad-v:hidden fixed inset-0 z-[200] bg-white dark:bg-gray-950 flex flex-col pt-12 animate-fade-in overflow-y-auto no-scrollbar overflow-x-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 mb-12">
            <button onClick={() => setIsMobileModalOpen(false)} className="p-2 -ml-2 text-gray-400 group">
              <IoChevronDown size={30} className="group-active:translate-y-1 transition-transform" />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">{t('music.playing_from')}</span>
              <span className="text-xs font-black uppercase text-pink-500">{postData.appFullName}</span>
            </div>
            <button onClick={() => setIsMobileModalOpen(false)} className="p-2 -mr-2 text-gray-400">
              <IoClose size={30} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-grow flex flex-col items-center px-10">
            {/* Rotating Large Avatar */}
            <div className={`relative w-[300px] h-[300px] mb-12 rounded-full border-[8px] transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)]
               ${isPlaying ? 'music-disc-playing border-pink-500' : 'music-disc-paused border-gray-900'}`}>
              <img src={postData.metadata.logo} alt="" className="w-full h-full object-cover rounded-full opacity-90 shadow-inner" />
              <div className="absolute inset-0 border-[2px] border-white/10 rounded-full scale-90"></div>
              <div className="absolute inset-0 border-[2px] border-white/10 rounded-full scale-75"></div>
              <div className="absolute inset-0 border-[2px] border-white/10 rounded-full scale-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full border-2 border-gray-900/50 shadow-inner z-10"></div>
            </div>

            {/* Track Info */}
            <div className="text-center mb-12 w-full">
              <MarqueeText
                text={currentTrack.title}
                containerClassName="mb-1"
                className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white"
              />
              <p className="text-pink-500 font-bold tracking-widest uppercase text-xs">{postData.appName} {t('music.radio')}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between w-full max-w-[280px] mb-12">
              <button
                onClick={prevTrack}
                className="p-4 text-gray-400 hover:text-pink-500 active:scale-90 transition-all"
              >
                <IoPlayBack size={32} />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(236,72,153,0.4)] active:scale-95 transition-all text-white"
              >
                {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} className="translate-x-1" />}
              </button>

              <button
                onClick={nextTrack}
                className="p-4 text-gray-400 hover:text-pink-500 active:scale-90 transition-all"
              >
                <IoPlayForward size={32} />
              </button>
            </div>

            {/* Extra Actions */}
            <div className="flex items-center gap-10 mt-auto pb-12">
              <button
                onClick={() => setIsMobilePlaylistOpen(true)}
                className="flex flex-col items-center gap-2 text-gray-400 group"
              >
                <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-3xl group-active:bg-pink-500/10 transition-colors">
                  <IoList size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{t('music.playlist')}</span>
              </button>
            </div>
          </div>

          {/* Sub-modal: Playlist Mobile */}
          {isMobilePlaylistOpen && (
            <div className="fixed inset-0 z-[300] bg-white dark:bg-gray-950 animate-slide-up flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-900">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t('music.playlist')}</span>
                  <span className="text-sm font-black text-pink-500 uppercase">{playlist.length} {t('music.tracks')}</span>
                </div>
                <button
                  onClick={() => setIsMobilePlaylistOpen(false)}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                {playlist.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      playTrack(index);
                      setIsMobilePlaylistOpen(false);
                    }}
                    className={`w-full flex items-center p-4 gap-4 rounded-3xl transition-all mb-2
                      ${currentTrack.id === track.id
                        ? 'bg-pink-500/10 border border-pink-500/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-900 border border-transparent'}`}
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                      <img src={postData.metadata.logo} alt="" className="w-full h-full object-cover" />
                      {currentTrack.id === track.id && (
                        <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                          <div className={`w-2 h-2 bg-pink-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start flex-grow overflow-hidden text-left">
                      <span className={`text-sm font-black uppercase truncate w-full ${currentTrack.id === track.id ? 'text-pink-500' : 'text-gray-900 dark:text-white'}`}>
                        {track.title}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{postData.appName} {t('music.archive')}</span>
                    </div>
                    {currentTrack.id === track.id && isPlaying && (
                      <div className="flex gap-0.5 items-end h-4">
                        <div className="w-1 bg-pink-500 animate-[bounce_0.6s_infinite]"></div>
                        <div className="w-1 bg-pink-500 animate-[bounce_0.8s_infinite]"></div>
                        <div className="w-1 bg-pink-500 animate-[bounce_0.7s_infinite]"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
