/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

const TimeSince = ({ startDate }) => {
    const [elapsedTime, setElapsedTime] = useState({
        totalDays: 0, // Tổng số ngày
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    // Tính năm nhuận
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    }
    // Ngày trong tháng
    const daysInMonth = (year, month) => {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    }
    useEffect(() => {
        const updateElapsedTime = () => {
            const now = new Date()
            const start = new Date(startDate)
            const diff = now - start
            // Tính tổng số ngày
            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
            // Tính năm, tháng, ngày
            let years = now.getFullYear() - start.getFullYear()
            let months = now.getMonth() - start.getMonth()
            let days = now.getDate() - start.getDate()
            // Điều chỉnh ngày, tháng, năm
            if (days < 0) {
                months -= 1
                const prevMonthDays = daysInMonth(now.getFullYear(), now.getMonth() - 1)
                days += prevMonthDays
            }
            if (months < 0) {
                years -= 1
                months += 12
            }
            // Tính tuần và ngày lẻ trong tuần
            const remainingDays = totalDays - (years * 365 + Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400)) // Loại bỏ ngày từ năm
            let weeks = Math.floor(remainingDays / 7)
            let extraDays = remainingDays % 7
            if (weeks > 4) {
                weeks = weeks % 4
                months += 1
                if (months > 11) {
                    months = 0
                    years += 1
                }
            }
            // Tính giờ, phút, giây
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((diff / (1000 * 60)) % 60)
            const seconds = Math.floor((diff / 1000) % 60)
            // Cập nhật state
            setElapsedTime({
                totalDays,
                years,
                months,
                weeks,
                days: extraDays,
                hours,
                minutes,
                seconds,
            })
        }

        const interval = setInterval(updateElapsedTime, 1000)

        return () => clearInterval(interval)
    }, [startDate])

    return elapsedTime
}

export default TimeSince