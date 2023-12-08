// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract forms {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    struct FormFields {
        uint user_id;
        uint fiche_id;
        string inter_type;
        string inter_object;
        string note;
        string compagny;
        string[] doc_hash;
    }

    FormFields[] public formFieldsList;
 
    function setForm(string memory _inter_type, string memory _inter_object, string memory _note,  string memory _compagny, string[] memory _doc_hash, uint _user_id, uint _fiche_id  )  public onlyOwner returns (uint) {
        FormFields memory newFormFields = FormFields({  
            user_id : _user_id,
            fiche_id : _fiche_id,
            inter_type : _inter_type,
            inter_object : _inter_object,
            note : _note,
            compagny : _compagny, 
            doc_hash : _doc_hash
        });
        formFieldsList.push(newFormFields);
        uint newIndex = formFieldsList.length - 1; // Index du nouvel élément ajouté
        return newIndex;
    }

    function updateForm(uint index, uint _user_id, string memory _inter_type, string memory _inter_object, string memory _note, string memory _compagny, string[] memory _doc_hash) public onlyOwner {
        require(index < formFieldsList.length, "Index out of bounds");
        
        FormFields storage formFields = formFieldsList[index];
        
        // Ajoute les conditions de mise à jour spécifiques que tu souhaites, par exemple:
        require(_user_id == formFields.user_id, "You don't have permission to update this form");

        formFields.inter_type = _inter_type;
        formFields.inter_object = _inter_object;
        formFields.note = _note;
        formFields.compagny = _compagny;
        formFields.doc_hash = _doc_hash;
    }

    function getFormTotalCount() public view returns (uint) {
        return formFieldsList.length;
    }

    function getFormCountPerUser(uint _user_id) public view returns (uint) {
        uint all_forms = getFormTotalCount();
        uint nbr_forms = 0;

        for (uint i = 0; i < all_forms; i++) {
            FormFields storage formFields = formFieldsList[i];
            if (_user_id == formFields.user_id) {
                nbr_forms++;
            }
        }    

        return nbr_forms;
    }

    function getUserUniqFormByFormId(uint index, uint _user_id) public view returns (uint, uint, string memory, string memory, string memory, string memory, string[] memory) {
        require(index < formFieldsList.length, "Index out of bounds");
        FormFields memory formFields = formFieldsList[index];
        require(_user_id == formFields.user_id, "You don't have permission to read this form");
        return (formFields.user_id, formFields.fiche_id, formFields.inter_type, formFields.inter_object, formFields.note, formFields.compagny, formFields.doc_hash);
    }

    function getUserAllForms() public view returns (FormFields[] memory) {
        return formFieldsList;  
    }

    function getDocHashCountPerFormPerUser(uint _user_id) public view returns (uint[] memory) {
        uint all_forms = getFormCountPerUser(_user_id);
        uint[] memory docHashCounts = new uint[](all_forms); 

        for (uint i = 0; i < all_forms; i++) {
            FormFields storage formFields = formFieldsList[i];
            if (_user_id == formFields.user_id) {
                docHashCounts[i] = formFields.doc_hash.length;
            }
        }
        return docHashCounts;
    }
}
