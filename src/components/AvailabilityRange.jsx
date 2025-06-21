function AvailabilityRange({ availability, setAvailability }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAvailability((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <label htmlFor="availabilityStart">Available From:</label>
      <input
        type="date"
        id="availabilityStart"
        name="availabilityStart"
        value={availability.availabilityStart}
        onChange={handleChange}
      />
      <label htmlFor="availabilityEnd">Available To:</label>
      <input
        type="date"
        id="availabilityEnd"
        name="availabilityEnd"
        value={availability.availabilityEnd}
        min={availability.availabilityStart}
        disabled={!availability.availabilityStart}
        onChange={handleChange}
      />
    </div>
  );
}

export default AvailabilityRange;
