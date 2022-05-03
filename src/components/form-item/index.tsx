import React, { FC, useState, useRef } from "react";

interface IFormItemProps {
    label: string;
}

export default function FormItem(props: IFormItemProps) {
    return (
        <div class="form-item">
            <div class="form-item__label">{props.label}</div>
            <span class="form-item__dot">：</span>
            <div class="form-item__content">
                {props.children}
            </div>
        </div>
    )
};