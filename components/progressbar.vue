<template>
    <p class="text-base w-full max-w-14 text-end pr-2">{{ msToTime(value) }}</p>
    <input class="slider max-w-80 w-full" type="range" :min="min" :max="max" :step="step" :value="value" @change="handleChange"
        @mousedown="handleDown" @mouseup="handleUpAndLeave" @mouseleave="handleUpAndLeave" @input="handleInput"
        :style="sliderStyle">
    <p class="text-base px-3">{{ msToTime(max) }}</p>
</template>

<script setup lang="ts">

    const store = useSpotifyStore();
    const state = computed(() => store.playbackState);
    const props = defineProps({
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        current: {
            type: Number,
            default: 60,
        },
    });

    const emit = defineEmits(['update:current']);
    const value = ref(props.current);
    const isChanging = ref(false);

    const setCSSProperty = () => {
        const percent = ((value.value - props.min) / (props.max - props.min)) * 100;
        sliderStyle.value = `--webkitProgressPercent: ${percent}%`;
    };

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        value.value = parseFloat(target.value);
        setCSSProperty();
    };

    const handleChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        value.value = parseFloat(target.value);
        emit('update:current', value.value);
        setCSSProperty();
        const authStore = useAuthStore();
        if (authStore.accessToken != null) {
            setPosition(authStore.accessToken, value.value, store.deviceId);
        }
    };

    const handleDown = () => {
        isChanging.value = true;
    };

    const handleUpAndLeave = () => {
        isChanging.value = false;
    };

    const sliderStyle = ref('');

    watch(() => props.current, (newCurrent) => {
        if (!isChanging.value) {
            value.value = newCurrent;
            setCSSProperty();
        }
    });

    setCSSProperty();

    setInterval(function () {
        if (!state.value.paused) {
            value.value += 100;
            setCSSProperty();
        }
    }, 100);
    function msToTime(duration: number): string {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let hoursStr = hours > 0 ? (hours < 10 ? "0" + hours : hours.toString()) + ":" : "";
        let minutesStr = (minutes == 0 ? "0" : minutes.toString());
        let secondsStr = (seconds < 10 ? "0" + seconds : seconds.toString());

        return hoursStr + minutesStr + ":" + secondsStr;
    }


</script>


<style scoped>
.slider {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 8px;
    @apply bg-spotify-fg-secondary rounded
}

.slider {
    /* For webkit support */
    --thumbSize: 16px;
    --trackSize: 8px;
    --thumbBg: #e0e0e0;
    --trackBg: #898989;
    --progressBg: #e0e0e0;

    /* webkit progress workaround */
    --webkitProgressPercent: 0%;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 8px;
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    margin-top: calc(((var(--trackSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
}

.slider:hover::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
}

.slider::-webkit-slider-runnable-track {
    height: var(--trackSize);
    background-image: linear-gradient(90deg,
            var(--progressBg) var(--webkitProgressPercent),
            var(--trackBg) var(--webkitProgressPercent));
    border-radius: calc(var(--trackSize) / 2);
}

.slider::-moz-range-thumb {
    height: 0;
    width: 0;
    border: 0;
}

.slider:hover::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border: 0;
    @apply bg-spotify-fg-primary;
    cursor: pointer;
}

.slider::-moz-range-progress {
    height: 8px;
    border-radius: 20px;
    @apply bg-spotify-fg-primary;
}

.slider:hover::-moz-range-progress {
    height: 8px;
    border-radius: 20px;
    @apply bg-spotify-primary;
}
</style>