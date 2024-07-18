// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Thrive {
    error InvalidDeadline(string message);

    enum campaignStatus {
        OPEN,
        CLOSED
    }

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 opening;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        campaignStatus status;
        address[] donators;
        uint256[] donations;
    }

    event Action(
        uint256 id,
        string actionType,
        address executor,
        uint256 timestamp
    );

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    uint256 public totalDonators = 0;
    uint256 public totalAmount = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _deadline,
        string memory _image
    ) public {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        if (_deadline < block.timestamp) {
            campaign.status = campaignStatus.CLOSED;
            revert InvalidDeadline(
                "The deadline should be a date in the future"
            );
        }
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.opening = block.timestamp;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.status = campaignStatus.OPEN;

        numberOfCampaigns++;

        emit Action(
            numberOfCampaigns - 1,
            "Campaign created",
            _owner,
            block.timestamp
        );
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(
            campaign.status == campaignStatus.OPEN,
            "The campaign is closed"
        );

        uint256 amount = msg.value;

        totalDonators++;

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount;
        totalAmount += amount;

        emit Action(
            _id,
            "Fund donated to campaign",
            msg.sender,
            block.timestamp
        );
    }

    function updateCampaign(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _deadline
    ) public returns (bool) {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Unauthorized Entity");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_image).length > 0, "ImageURL cannot be empty");

        campaign.title = _title;
        campaign.description = _description;
        campaign.image = _image;
        campaign.deadline = _deadline;

        emit Action (
            _id,
            "Campaign updated",
            msg.sender,
            block.timestamp
        );

        return true;
    }


    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function deleteCampaign(uint256 _id) public returns (uint256) {
        Campaign storage campaign = campaigns[_id];

        require(
            msg.sender == campaign.owner,
            "Unauthorized Entity"
        );

        uint256 amount = campaign.amountCollected;
        totalAmount -= amount;

        uint256 donators = campaign.donators.length;
        totalDonators -= donators;

        campaign.owner = address(0);
        campaign.title = "";
        campaign.description = "";
        campaign.opening = 0;
        campaign.deadline = 0;
        campaign.amountCollected = 0;
        campaign.image = "";
        delete campaign.donators;
        delete campaign.donations;

        numberOfCampaigns--;
        campaign.status = campaignStatus.CLOSED;

        emit Action(_id, "Campaign deleted", msg.sender, block.timestamp);

        return numberOfCampaigns;
    }

    function getOwner() public view returns (address) {
        return address(this);
    }

    function getCampaignOwner(uint256 _id) public view returns (address) {
        return campaigns[_id].owner;
    }

    function getTotalDonator() public view returns (uint256) {
        return totalDonators;
    }

    function getTotalFund() public view returns (uint256) {
        return totalAmount;
    }

    function getTotalCampaign() public view returns (uint256) {
        return numberOfCampaigns;
    }

    function getAmountCollected(uint256 _id) public view returns (uint256) {
        return campaigns[_id].amountCollected;
    }
    
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }
}
