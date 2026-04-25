// Transfer/mangoVoice.js

class MangoVoiceAssistant {
    constructor() {
        // 브라우저 호환성 체크 (Chrome, Safari, Edge 등 지원)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("이 브라우저는 음성 인식을 지원하지 않습니다.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ko-KR'; // 한국어 설정
        this.recognition.interimResults = true; // 중간 결과 반환
        this.recognition.maxAlternatives = 1;

        this.isListening = false;
        this.setupEvents();
    }

    setupEvents() {
        const textDisplay = document.getElementById('voice-text-display');
        const waveUI = document.getElementById('voice-wave-ui');

        this.recognition.onstart = () => {
            this.isListening = true;
            textDisplay.innerText = "목적지를 말씀해 주세요...";
            waveUI.classList.add('active-listening');
            if(window.showMangoToast) showMangoToast("마이크가 활성화되었습니다.");
        };

        this.recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            textDisplay.innerText = transcript; // 실시간 텍스트 표시

            if (event.results[current].isFinal) {
                this.processCommand(transcript);
            }
        };

        this.recognition.onspeechend = () => {
            this.stopListening();
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error detected: ' + event.error);
            textDisplay.innerText = "음성을 인식하지 못했습니다. 다시 시도해주세요.";
            this.stopListening();
        };
    }

    startListening() {
        if (this.isListening) return;
        document.getElementById('voice-overlay').classList.remove('hidden');
        setTimeout(() => document.getElementById('voice-overlay').style.opacity = '1', 10);
        this.recognition.start();
    }

    stopListening() {
        this.isListening = false;
        this.recognition.stop();
        document.getElementById('voice-wave-ui').classList.remove('active-listening');
        
        // 2초 후 오버레이 닫기
        setTimeout(() => {
            document.getElementById('voice-overlay').style.opacity = '0';
            setTimeout(() => document.getElementById('voice-overlay').classList.add('hidden'), 500);
        }, 2000);
    }

    processCommand(transcript) {
        // "가자", "찾아줘" 등 불필요한 단어 제거를 위한 간단한 NLP 처리
        let destination = transcript.replace(/가자|찾아줘|안내해줘|으로|로/g, '').trim();
        
        if(window.showMangoToast) showMangoToast(`목적지 '${destination}'(으)로 설정 중...`);
        
        // AR HUD 목적지 텍스트 변경 (요소 존재 시)
        const arTargetText = document.querySelector('#nav-info-box p');
        if (arTargetText) {
            arTargetText.innerHTML = `<span class="text-teal-400">TARGET:</span> '${destination}' <span id="nav-dist-text" class="text-gray-400 ml-2">탐색 중...</span>`;
        }

        // 목적지 설정 후 망고 택시 레이더 자동 스캔 연동
        if (typeof window.scanMangoTaxi === 'function') {
            setTimeout(() => {
                window.scanMangoTaxi();
            }, 1000);
        }
    }
}

// 인스턴스 생성 및 전역 연결
const mangoVoice = new MangoVoiceAssistant();
window.startMangoVoice = () => mangoVoice.startListening();