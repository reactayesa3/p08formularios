import React, { useEffect, useState } from 'react'
import useDateInput from '../hooks/useDateInput';
import useTextInput from '../hooks/useTextInput'

export default function CreateBudget() {

    const inputsData = {
        customer: {
            label: 'Cliente',
            value: '',
            maxLength: 100,
            errorMessages: ['*','El cliente debe tener al menos 4 caracteres'],
            valid: false,
            pattern: /^.{4,}$/
        },
        cif: {
            label: 'CIF',
            value: '',
            maxLength: 9,
            errorMessages: ['*','El CIF debe comenzar por letra válida y tener 9 caracteres'],
            valid: false,
            pattern: /([ABCDEFGHPQS])([0-9]{8})/i
        },
        contact: {
            label: 'Persona de contacto',
            value: '',
            maxLength: 100,
            errorMessages: ['',''],
            valid: true,
            pattern: /.*/i
        },
        budgetDate: {
            label: 'Fecha presupuesto',
            value: new Date().toISOString().substring(0,10)
        }
    }

    const [customerInput, customerValue, isCustomerValid] = useTextInput(inputsData.customer);
    const [cifInput, cifValue, isCifValid] = useTextInput(inputsData.cif);
    const [contactInput, contactValue] = useTextInput(inputsData.contact);
    const [budgetDateInput, budgetDateValue] = useDateInput(inputsData.budgetDate);

    const [isValidForm, setIsValidForm] = useState(false);

    useEffect(() => {
        setIsValidForm(isCustomerValid && isCifValid);
    }, [isCustomerValid,isCifValid])

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log({
            customer: customerValue,
            cif: cifValue,
            contact: contactValue,
            budgetDate: new Date(budgetDateValue),
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-100">
                    <form onSubmit={handleOnSubmit}>
                        <div className="row">
                            <div className="col-100">
                                {customerInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {cifInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {contactInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {budgetDateInput}
                            </div>
                        </div>
                        <div className="row end">
                            <button type="submit" disabled={!isValidForm}>Añadir</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
