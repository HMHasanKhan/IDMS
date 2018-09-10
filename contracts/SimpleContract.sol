pragma solidity ^0.4.24;

contract SimpleContract{
    uint EndorsementListPosition;
    uint public numberOfUserAccounts;
    uint public numberOfEndorserAccounts;
    
    event AllotedAddress(address AllotedAddress);
    event AllotedAddressEndorser(address AllotedAddressEndorser);
    
    constructor(){
        numberOfUserAccounts = 0;
        numberOfEndorserAccounts=0;
        EndorsementListPosition = 0;
        
    }
    
    
    function createUserAccount(string name, string password, string gen, string nid,string email,string DOB) returns(address){
        
        address a = new User(true, name, password);
        AllotedAddress(a);
        User user = User(a);
        user.setGender(gen);
        user.setnId(nid);
        user.setEmail(email);
        user.setDOB(DOB);
        numberOfUserAccounts++;
        
        return a;
    }
    
    
    function getDetails(address addr, string pw) returns(bool,string,string,string,string,string,bool){
        User user = User(addr);
        require(keccak256(user.getPassordHash())==keccak256(keccak256(pw)));
        return (user.getTypeOfUser(),user.getName(),user.getEmail(),user.getDOB(),user.getGender(),user.getnId(),user.getEndorsementStatus());
    }
    
    struct AppliedEndorsement{
        address AppliedBy;
        string appliedByPw;
    }
    
    address[] public Endorsers;
    AppliedEndorsement[] public AppliedEndorsementList;
    
    function createEndorser(string name, string pw)returns(address){
        address a = new User(false, name, pw);
        AllotedAddressEndorser(a);
        Endorsers.push(a);
        numberOfEndorserAccounts++;
        return a;
    }
    event Status(string status);
    
    function applyForEndorsemntMain(address addr, string pw)returns (string){
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) && user.getEndorsementStatus()==false){
        AppliedEndorsementList.push(AppliedEndorsement(user.applyForEndorsement(),pw));
        EndorsementListPosition++;
        Status("Application Successful");
        return ("Successfull");

        }
    }
    function getNumberofAppliedEndorsementCurrent() returns(uint256 a){
        a = AppliedEndorsementList.length;
        return a;
    }
    function getAllAppliedEndorsements(address addr, string pw, uint position)returns(address,string){
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) && user.getTypeOfUser()==false){
          
            return (AppliedEndorsementList[position].AppliedBy,AppliedEndorsementList[position].appliedByPw);
        }
        else{
            return (0xc00000000000002088730c353a52cc3fa157fbdf,"123");
        }
    
    }
    
    
    
    // }
    
    function EndorsementVerified(address addr, string pw,address uaddr, uint256 id) returns(string){ // here endorsers address and pw are required
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) && user.getTypeOfUser()==false){
            User userU = User(uaddr);
            userU.AddEndorsement(addr,user.getName(),"Verified");
            userU.setEndorsementStatus(false);
            delete AppliedEndorsementList[id];
            for(uint i=id; i<AppliedEndorsementList.length-1;i++){

                AppliedEndorsementList[i].AppliedBy = AppliedEndorsementList[i+1].AppliedBy;
                AppliedEndorsementList[i].appliedByPw = AppliedEndorsementList[i+1].appliedByPw;

            }
            delete AppliedEndorsementList[AppliedEndorsementList.length-1];
            AppliedEndorsementList.length--;
            return ("Verified");


            //AppliedEndorsementList[id].AppliedBy = 0x00000000000000000000000000000000000000;
            //AppliedEndorsementList[id].appliedByPw = "";



            // removing from list
            // for(uint i= id; i<AppliedEndorsementList.length;i++){
            //     AppliedEndorsementList[i].AppliedBy=AppliedEndorsementList[i+1].AppliedBy;
            //     AppliedEndorsementList[i].appliedByPw = AppliedEndorsementList[i+1].appliedByPw;
            // }
            // AppliedEndorsementList.length = AppliedEndorsementList.length -1;
        }
     }
    function EndorsementRejected(address addr, string pw,address uaddr, uint256 id)returns (string){ // here endorsers address and pw are required
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) && user.getTypeOfUser()==false){
            User userU = User(uaddr);
            //userU.AddEndorsement(addr,user.getName(),"Rejected");
            userU.setEndorsementStatus(false);
            delete AppliedEndorsementList[id];
            for(uint i=id; i<AppliedEndorsementList.length-1;i++){

                AppliedEndorsementList[i].AppliedBy = AppliedEndorsementList[i+1].AppliedBy;
                AppliedEndorsementList[i].appliedByPw = AppliedEndorsementList[i+1].appliedByPw;

            }
            delete AppliedEndorsementList[AppliedEndorsementList.length-1];
            AppliedEndorsementList.length--;
            return("Rejected");

            // removing from list
            // for(uint i= id; i<AppliedEndorsementList.length;i++){
            //     AppliedEndorsementList[i].AppliedBy=AppliedEndorsementList[i+1].AppliedBy;
            //     AppliedEndorsementList[i].appliedByPw = AppliedEndorsementList[i+1].appliedByPw;
            // }
            // AppliedEndorsementList.length = AppliedEndorsementList.length -1;
        }
        
    }
    
    //function for testing
    // function createDefualtEndorsers(){
    //     createEndorser("Haady","123");
    //     createEndorser("Waleed","123");
    //     createEndorser("Hasan","123");
    // }

    // function getEndorserFromList(uint n) returns (address){
    //     if (n>Endorsers.length)
    //     throw;

    //     return Endorsers[n];

    // }

    function getNumberofEndorsementOfUser1(address addr)public constant returns(uint256){
        uint256 n=0;
        User user = User(addr);
        n = user.getNumberofEndorsements();
        return n;
        
        
    }
    function getEndorserFromUser(address addr, string pw, uint256 position)returns(address,string,string){
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) )
        return(user.getEndorserAddFromPosition(position),user.getEndorserNameFromPosition(position),user.getEndorsementVerificationStatusFromPosition(position));
    }
    
    
    
}

contract User{
    bool typeOfUser; // true for User, false for endorser
    string name;
    string passwordHash;
    
    
    string email;
    string DOB;
    string gender;
    string nId;
    
    bool EndorsmentStatus;
    
    struct EndorsmentDetails{
        address EndorsedBy;
        string Name;
        string Verification;
        
    }
    EndorsmentDetails[] public Endorsments;
    
    constructor(bool t, string n, string password){
        typeOfUser = t;
        name = n;
        passwordHash = password;
        EndorsmentStatus = false;
        Endorsments.push(EndorsmentDetails(this,"IDMS-Self-Endorsement","Verified"));
        
    }
    
    function setEmail(string em){
        email = em;
    }
    function setDOB(string dob){
        DOB = dob;
        
    }
    function setEndorsementStatus(bool a){
        EndorsmentStatus = a;
    }
    function setGender(string gen){
        gender=gen;
    }
    function setnId(string nid){
        nId = nid;
    }
    function getGender() returns(string){
        return gender;
    }
    function getnId() returns(string){
        return nId;
    }
    
    function getPassordHash() returns(string){
        return bytes32toString(keccak256(passwordHash));
    }
    function getName() returns(string){
        return name;
    }
    
    function getEmail() returns (string){
        return email;
    }
    function getDOB() returns( string ){
        return DOB;
    }
    function getEndorsementStatus() returns(bool){
        return EndorsmentStatus;
    }
    function getTypeOfUser()returns(bool){
        return typeOfUser;
    }
    
     function bytes32toString(bytes32 _bytes32) public constant returns(string){
        bytes memory bytesArray = new bytes(32);
        for(uint256 i; i<32;i++){
            bytesArray[i]=_bytes32[i];
        }
        return string(bytesArray);
    }
    
    function applyForEndorsement()returns(address){
        EndorsmentStatus = true;
        return this;
    }
    
    function AddEndorsement(address addr,string name, string v){
        Endorsments.push(EndorsmentDetails(addr,name,v));
    }
    
    function getNumberofEndorsements()returns (uint256){
        return Endorsments.length;
    }
    function getEndorserAddFromPosition(uint256 i) returns(address){
        return Endorsments[i].EndorsedBy;
    }
    function getEndorserNameFromPosition(uint256 i) returns(string){
        return Endorsments[i].Name;
    }
    function getEndorsementVerificationStatusFromPosition(uint256 i) returns(string){
        return Endorsments[i].Verification;
    }
    
}
    
    
    

















// pragma solidity ^0.4.22;

// contract SimpleContract {

// 	    event showString(address AllotedAddress);
    
//     mapping (address => address) listofAccounts;

//     function createWallet(bytes32 name, bytes32 age, bytes32 pAddres)returns (string){
//         address a  = new Wallet(name, age, pAddres);
//         showString(a);
//         return toString(a);
//     }
        
//         function getData(address adr) payable returns(bytes32, bytes32, bytes32){
//             Wallet wallet = Wallet(adr);
            
            
            
//         return (wallet.getName(),wallet.getAge(),wallet.getAddress());
        
//     }

//     function toString(address x)private returns (string) {
//     bytes memory b = new bytes(20);
//     for (uint i = 0; i < 20; i++)
//         b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
//     return string(b);
//     }
    
// }
// contract Wallet{
//     event showStringWallet(bytes32 name, bytes32 age,bytes32 pAddress);
    
//     bytes32 name;
//     bytes32 age;
//     bytes32 pAddress;
    
//     function Wallet(bytes32 n, bytes32 a, bytes32 p){
//         showStringWallet(n, a, p);
//         name=n;
//         age=a;
//         pAddress=p;
        

//     }
    
//     function getName() returns(bytes32){
//         return name;
//     }
//     function getAge() returns(bytes32){
//         return age;
//     }
//     function getAddress() returns(bytes32){
//         return pAddress;
//     }
    
// }