function make_withdraw(balance, password) {
    
    let attempts = 0;
    
    function withdraw(amount) {
        if (attempts >= 3) {
            return "account locked";
        } else if (pw !== password) {
            attempts = attempts + 1;
            return "wrong password";
        }
        attempts = 0;
        if (balance >= amount) {
            balance = balance - amount;
            return balance;
        } else {
            return "Insufficient funds";
        }
    }
    return withdraw;
}