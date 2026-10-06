import React from 'react';
import { ArrowLeft, ArrowRight, Map, HelpCircle, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Navigation = ({
  onPrev,
  onNext,
  onMap,
  onHelp,
  onReplay,
  prevLabel = 'Kembali',
  nextLabel = 'Lanjut',
  disableNext = false,
  showMap = true,
  showHelp = true,
  showReplay = false
}) => {
  const handleAction = (callback) => {
    soundEngine.playClick();
    if (callback) callback();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 28,
        paddingTop: 16,
        borderTop: '2px dashed #e2e8f0'
      }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {onPrev && (
          <button
            onClick={() => handleAction(onPrev)}
            className="btn btn-outline"
          >
            <ArrowLeft size={18} />
            <span>{prevLabel}</span>
          </button>
        )}

        {showMap && onMap && (
          <button
            onClick={() => handleAction(onMap)}
            className="btn btn-outline"
            title="Kembali ke Peta Misi"
          >
            <Map size={18} />
            <span className="hidden sm:inline">Peta Misi</span>
          </button>
        )}

        {showReplay && onReplay && (
          <button
            onClick={() => handleAction(onReplay)}
            className="btn btn-icon btn-outline"
            title="Ulangi Materi / Aktivitas Ini"
          >
            <RotateCcw size={18} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {showHelp && onHelp && (
          <button
            onClick={() => handleAction(onHelp)}
            className="btn btn-icon btn-outline"
            title="Petunjuk & Bantuan"
          >
            <HelpCircle size={18} />
          </button>
        )}

        {onNext && (
          <button
            onClick={() => handleAction(onNext)}
            disabled={disableNext}
            className={`btn btn-primary ${disableNext ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ minWidth: 120 }}
          >
            <span>{nextLabel}</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
