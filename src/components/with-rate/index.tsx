import React, { FC, useState, useRef, useEffect } from "react";
import {Rate} from 'antd';

interface IRateProps {
    grade: string;
    allowHalf: boolean;
    count: number;
    onChange: (value: number) => void;
}

export default function WithRate(props: IRateProps = {allowHalf: true, count: 5}) {
    const {grade, onChange} = props;
    const [gradeNumber, setGradeNumber] = useState(0);
    useEffect(() => {
        const gradeTemp = grade ? parseFloat(grade, 2) : 0;
        setGradeNumber(gradeTemp);
    }, [grade]);
    const handleChange = value => {
        setGradeNumber(value);
        if (onChange) {
            onChange(value);
        }
    };
    return (
        <Rate
            {...props}
            value={gradeNumber}
            onChange={handleChange}
        />
    )
};