import React, { FC, useState, useRef } from "react";

interface IFormItemProps {
    label: string;
}

export default function FormItem(props: IFormItemProps) {
    return (
        <div className="form-item">
            <div className="form-item__label">{props.label}</div>
            <span className="form-item__dot">：</span>
            <div className="form-item__content">
                {props.children}
            </div>
        </div>
    )
};