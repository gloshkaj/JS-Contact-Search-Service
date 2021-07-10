// Start your code here!
// You should not need to edit any other existing files (other than if you would like to add tests)
// You do not need to import anything as all the necessary data and events will be delivered through
// updates and service, the 2 arguments to the constructor
// Feel free to add files as necessary
import contacts from '../accessLayer/data';
export default class
{
    constructor(updates, service)
    {
        this.updates = updates;
        this.service = service;
    }

    search(query)
    {
        let results = [];
        let str = query.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
        let num = str.replace(" ", "").replace(" ", "");
        let searchBy = "phone";
        if (isNaN(num))
        {
            searchBy = "name";
        }
        if (searchBy === "phone")
        {
            for (let contact of contacts)
            {
                let first = contact.firstName;
                let last = contact.lastName;
                let nick = contact.nickName;
                let phone = contact.primaryPhoneNumber;
                let secPhone = contact.secondaryPhoneNumber;
                if (phone.replace('-', '').includes(query) || secPhone.replace('-', '').includes(query))
                {
                    results.push(this.getObj(contact, first, last, nick, phone, secPhone));
                }
            }
        }
        else
        {
            for (let contact of contacts)
            {
                let first = contact.firstName;
                let last = contact.lastName;
                let nick = contact.nickName;
                let phone = contact.primaryPhoneNumber;
                let secPhone = contact.secondaryPhoneNumber;
                let full = first + " " + nick + " " + last;
                let full2 = first + " " + last + " " + nick;
                if (full.includes(query) || full2.includes(query))
                {
                    results.push(this.getObj(contact, first, last, nick, phone, secPhone));
                }
            }
        }
        return results;
    }
    formatPhone(str)
    {
        let cleaned = ('' + str).replace(/\D/g, '');
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match)
        {
            return ['(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null;
    }
    getObj(contact, first, last, nick, phone, secPhone)
    {
        return {
            id : contact.id,
            name: nick.isEmpty() ? first + " " + last : nick + " " + last,
            email: contact.email,
            phones: secPhone.isEmpty() ? [this.formatPhone(phone)] : [this.formatPhone(phone), this.formatPhone(secPhone)],
            address: contact.addressLine1 + ", " + contact.addressLine2 + ", " + contact.addressLine3 + ", " + contact.city + ", " + contact.state + ", " + contact.zipCode
        }
    }
}