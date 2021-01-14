import { getCarsUrlByQuery, fetchCars, getCarsToNumber, getCarsFromNumber } from '../util/utils'

describe('util > getCarsUrlByQuery, getCarsToNumber, getCarsFromNumber', () => {
    
    test('should return fetch car url with all params', () => {
        const getCarsUrl =  getCarsUrlByQuery({color: 'green', manufacturer:'audi', page: 1})
        expect(getCarsUrl).toBe(`${fetchCars}?color=green&manufacturer=audi&page=1`)
    })

    test('should return fetch car url with color', () => {
        const getCarsUrl =  getCarsUrlByQuery({color: 'green', page: 1})
        expect(getCarsUrl).toBe(`${fetchCars}?color=green&page=1`)
    })

    test('should return fetch car url with manufacturer', () => {
        const getCarsUrl =  getCarsUrlByQuery({manufacturer:'audi', page: 1})
        expect(getCarsUrl).toBe(`${fetchCars}?manufacturer=audi&page=1`)
    })

    test('should return fetch car url with page', () => {
        const getCarsUrl =  getCarsUrlByQuery({page: 1})
        expect(getCarsUrl).toBe(`${fetchCars}?page=1`)
    })

    test('should return showing car to count', () => {
        const showingTill =  getCarsToNumber(2, 100, 1000)
        expect(showingTill).toBe(20)
    })

    test('should return showing car from count', () => {
        const showingFrom =  getCarsFromNumber(2, 100, 20)
        expect(showingFrom).toBe(11)
    })

})