import React, { useState } from 'react';
import Picker, { EmojiStyle, SkinTones, Theme } from 'emoji-picker-react'

type EmojiObjectProps = {

    activeSkinTone: SkinTones;
    unified: string;
    unifiedWithoutSkinTone: string;
    emoji: string;
    names: string[];
    getImageUrl: (emojiStyle: EmojiStyle) => string;

}

type EmojiComponentProps = {
    inputStr: string
    setInputStr: React.Dispatch<React.SetStateAction<string>>
    showPicker: boolean
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
}

export function EmojiComponent({ inputStr, setInputStr, showPicker, setShowPicker }: EmojiComponentProps) {



    const onEmojiClick = (EmojiObject: EmojiObjectProps) => {
        setInputStr(prevInput => prevInput + EmojiObject.emoji)
        setShowPicker(false)
    }

    return (
        <>

            <img
                className='emoji-icon'
                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                onClick={() => setShowPicker(!showPicker)} />
            {showPicker && <Picker
                onEmojiClick={onEmojiClick}
                theme={Theme.AUTO} />}
        </>
    );
}

